import { supabase } from "@/lib/supabase";

export const GithubUser = async (username) => {
    if (!username) return "User Not Found";

    try {
        // Step 1: Check if user exists on GitHub
        const github = await fetch(`/api/github?username=${username}`);
        if (!github.ok) {
            return "User Not Found";
        }

        // Step 2: Check if user already exists in your Supabase DB
        const { data, error } = await supabase
            .from("Users")
            .select("github_username")
            .eq("github_username", username)
            .single();

        if (data && data.github_username) {
            return "User Already Exists";
        }

        // Step 3: Return GitHub API data
        const githubData = await github.json();
        return githubData;
    } catch (err) {
        console.error("GithubUser() error:", err);
        return "User Not Found";
    }
};
