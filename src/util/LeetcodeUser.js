import { supabase } from "@/lib/supabase";

export const LeetcodeUser = async (username) => {
    const leetcode = await fetch(`/api/leetcode?username=${username}`);
    if (leetcode.status !== 200) {
        return "User Not Found";
    }
    const { data, error } = await supabase
        .from("Users")
        .select("leetcode_username")
        .eq("leetcode_username", username)
        .single();
    if (data && data.leetcode_username) {
        return "User Already Exists";
    }
    const leetcodeData = await leetcode.json();

    return leetcodeData;
};
