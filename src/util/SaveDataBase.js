import { supabase } from "@/lib/supabase";

export const SaveDataBase = async (
    userData,
    LeetcodeData,
    GithubData,
    codeforcesData
) => {
    let avatar_url = GithubData.avatar_url; // Default to GitHub avatar

    if (userData.avatar) {
        const filePath = `public/${userData.github_username}.png`;
        const { error: uploadError } = await supabase.storage
            .from("profiler")
            .upload(filePath, userData.avatar, {
                cacheControl: "3600",
                upsert: true,
            });

        if (uploadError) {
            console.error("Error uploading avatar:", uploadError);
        } else {
            const { data: publicUrlData } = supabase.storage
                .from("profiler")
                .getPublicUrl(filePath);
            avatar_url = publicUrlData.publicUrl;
        }
    }

    const newUser = {
        name: userData.Name,
        github_username: userData.github_username,
        leetcode_username: userData.leetcode_username,
        avatar_url: avatar_url,
        codeforces_username: userData.codeforces_username,
        codeforces_rank: codeforcesData.rank,
        codeforces_rating: codeforcesData.rating,
        codeforces_contest: codeforcesData.contests,
        leetcode_ranking: LeetcodeData.ranking,
        leetcode_problems: LeetcodeData.problemAll,
        problem_easy: LeetcodeData.problemEasy,
        problem_medium: LeetcodeData.problemMedium,
        problem_hard: LeetcodeData.problemHard,
        github_name: GithubData.name,
        public_repos: GithubData.public_repos,
        github_bio: GithubData.bio,
        repos: GithubData.repos,
        followers: GithubData.followers,
    };
    const { error: UserError } = await supabase
        .from("Users")
        .upsert(newUser, { onConflict: "github_username" })
        .single();

    if (UserError) {
        console.error("Error inserting user:", UserError);
        return;
    }

    return {
        message: "User and stats saved successfully",
    };
};
