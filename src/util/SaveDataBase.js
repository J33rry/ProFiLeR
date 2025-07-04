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
    };
    const { error: UserError } = await supabase
        .from("Users")
        .insert(newUser)
        .single();

    if (UserError) {
        console.error("Error inserting user:", UserError);
        return;
    }

    return {
        message: "User and stats saved successfully",
    };
};
