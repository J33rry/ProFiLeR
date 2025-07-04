import { supabase } from "@/lib/supabase";

export const GithubUser = async (username) => {
    if (!username) return "User Not Found";

    try {
        const github = await fetch(`/api/github?username=${username}`);

        if (!github.ok) {
            return "User Not Found";
        }

        const { data, error } = await supabase
            .from("Users")
            .select("github_username")
            .eq("github_username", username)
            .single();

        if (data && data.github_username) {
            return "User Already Exists";
        }

        const githubData = await github.json();
        return githubData;
    } catch (err) {
        console.error("GithubUser() error:", err);
        return "User Not Found";
    }
};
