import { supabase } from "@/lib/supabase";

export const GetData = async () => {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) {
        console.error("Error fetching data:", error);
        return [];
    }
    return data;
};
