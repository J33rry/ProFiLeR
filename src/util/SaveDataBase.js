import { supabase } from "@/lib/supabase";

export const SaveDataBase = async (userData, LeetcodeData, GithubData) => {
    const newUser = {
        name: userData.Name,
        github_username: userData.github_username,
        leetcode_username: userData.leetcode_username,
        avatar_url: GithubData.avatar_url,
        portfolio_url: userData.portfolio_url || "",
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

        // console.log("Avatar URL:", publicURLData.publicUrl);
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

    const userStats = {
        id: userID.data.id,
        leetcode_ranking: LeetcodeData.profile.ranking,
        leetcode_problems_solved:
            LeetcodeData.submitStats.acSubmissionNum[0].count,
        problem_easy: LeetcodeData.submitStats.acSubmissionNum[1].count,
        problem_medium: LeetcodeData.submitStats.acSubmissionNum[2].count,
        problem_hard: LeetcodeData.submitStats.acSubmissionNum[3].count,
        github_repos: GithubData.public_repos,
    };
    const { error: statsError } = await supabase
        .from("user_stats")
        .insert(userStats)
        .single();
    if (statsError) {
        console.error("Error inserting user stats:", statsError);
        return;
    }
    return {
        user: newUser,
        stats: userStats,
        message: "User and stats saved successfully",
    };
};
