import { supabase } from "@/lib/supabase";

export const SaveDataBase = async (
    userData,
    LeetcodeData,
    GithubData,
    codeforcesData
) => {
    const newUser = {
        name: userData.Name,
        github_username: userData.github_username,
        leetcode_username: userData.leetcode_username,
        avatar_url: GithubData.avatar_url,
        codeforces_username: userData.codeforces_username || "",
    };

    const { error: UserError } = await supabase
        .from("Users")
        .insert(newUser)
        .single();

    if (UserError) {
        console.error("Error inserting user:", UserError);
        return;
    }
    const userID = await supabase
        .from("Users")
        .select("id")
        .eq("github_username", newUser.github_username)
        .single();

    if (userData.avatar) {
        const filePath = `${userID.data.id}`;
        const { data, error } = await supabase.storage
            .from("profiler")
            .upload(filePath, userData.avatar);

        if (error) {
            console.error("Upload error:", error.message);
            return;
        }
        const { data: publicURLData } = supabase.storage
            .from("profiler")
            .getPublicUrl(filePath);

        const { error: updateError } = await supabase
            .from("Users")
            .update({
                avatar_url: publicURLData.publicUrl,
            })
            .eq("id", userID.data.id);
        if (updateError) {
            console.error("Error updating avatar URL:", updateError);
            return;
        }
    }

    const LeetcodeStats = {
        id: userID.data.id,
        leetcode_ranking: LeetcodeData.ranking,
        leetcode_problems_solved: LeetcodeData.problemAll,
        problem_easy: LeetcodeData.problemEasy,
        problem_medium: LeetcodeData.problemMedium,
        problem_hard: LeetcodeData.problemHard,
    };
    const { error: LeetcodeError } = await supabase
        .from("leetcode_stats")
        .insert(LeetcodeStats)
        .single();
    if (LeetcodeError) {
        console.error("Error inserting leetcode stats:", LeetcodeError);
        const { error: deleteUserError } = await supabase
            .from("Users")
            .delete()
            .eq("id", userID.data.id);
        if (deleteUserError) {
            console.error(
                "Error deleting user after Leetcode error:",
                deleteUserError
            );
        }

        return;
    }

    const GithubStats = {
        id: userID.data.id,
        name: GithubData.name,
        bio: GithubData.bio,
        public_repos: GithubData.public_repos,
        repos: GithubData.repos,
    };

    const { error: GithubError } = await supabase
        .from("github_stats")
        .insert(GithubStats)
        .single();
    if (GithubError) {
        console.error("Error inserting github stats:", GithubError);
        const { error: deleteUserError } = await supabase
            .from("Users")
            .delete()
            .eq("id", userID.data.id);
        if (deleteUserError) {
            console.error(
                "Error deleting user after Github error:",
                deleteUserError
            );
        }
        return;
    }

    const codeforcesStats = {
        id: userID.data.id,
        rating: codeforcesData.rating,
        rank: codeforcesData.rank,
        contest: codeforcesData.contests,
    };
    const { error: codeforcesError } = await supabase
        .from("codeforces_stats")
        .insert(codeforcesStats)
        .single();
    if (codeforcesError) {
        console.error("Error inserting codeforces stats:", codeforcesError);
        const { error: deleteUserError } = await supabase
            .from("Users")
            .delete()
            .eq("id", userID.data.id);
        if (deleteUserError) {
            console.error(
                "Error deleting user after Codeforces error:",
                deleteUserError
            );
        }
        return;
    }

    return {
        user: newUser,
        LeetcodeStats,
        GithubStats,
        codeforcesStats,
        message: "User and stats saved successfully",
    };
};
