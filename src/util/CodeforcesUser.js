import { supabase } from "@/lib/supabase";

export const CodeforcesUser = async (username) => {
    if (!username) return "User Not Found";

    try {
        const codeforces = await fetch(`/api/codeforces?username=${username}`);
        if (!codeforces.ok) {
            return "User Not Found";
        }

        const { data } = await supabase
            .from("Users")
            .select("codeforces_username")
            .eq("codeforces_username", username)
            .single();
        if (data && data.codeforces_username) {
            return "User Already Exists";
        }
        const codeforcesData = await codeforces.json();
        // console.log("Codeforces API Response:", codeforcesData);
        return codeforcesData;
    } catch (err) {
        console.error("CodeforcesUser() error:", err);
        return "User Not Found";
    }
};
