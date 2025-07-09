import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { data: users, error } = await supabase.from("Users").select("*");

        if (error) {
            console.error("Error fetching users:", error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
        console.log("Starting nightly stat update for all users...");
        const updatePromises = users.map(async (user) => {
            try {
                const host = request.headers.get("host");
                const protocol = host.startsWith("localhost")
                    ? "http"
                    : "https";
                const baseUrl =
                    process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

                const [githubRes, codeforcesRes, leetcodeRes] =
                    await Promise.all([
                        fetch(
                            `${baseUrl}/api/github?username=${user.github_username}`
                        ).catch((e) => {
                            console.error(
                                `GitHub fetch failed for ${user.github_username}:`,
                                e
                            );
                            return null;
                        }),
                        fetch(
                            `${baseUrl}/api/codeforces?username=${user.codeforces_username}`
                        ).catch((e) => {
                            console.error(
                                `Codeforces fetch failed for ${user.codeforces_username}:`,
                                e
                            );
                            return null;
                        }),
                        fetch(
                            `${baseUrl}/api/leetcode?username=${user.leetcode_username}`
                        ).catch((e) => {
                            console.error(
                                `LeetCode fetch failed for ${user.leetcode_username}:`,
                                e
                            );
                            return null;
                        }),
                    ]);

                const githubdata = githubRes ? await githubRes.json() : {};
                const codeforcesdata = codeforcesRes
                    ? await codeforcesRes.json()
                    : {};
                const leetcodedata = leetcodeRes
                    ? await leetcodeRes.json()
                    : {};

                const { error: updateError } = await supabase
                    .from("Users")
                    .update({
                        codeforces_rank: codeforcesdata.rank,
                        codeforces_rating: codeforcesdata.rating,
                        codeforces_contest: codeforcesdata.contests,
                        leetcode_ranking: leetcodedata.ranking,
                        leetcode_problems: leetcodedata.problemAll,
                        problem_easy: leetcodedata.problemEasy,
                        problem_medium: leetcodedata.problemMedium,
                        problem_hard: leetcodedata.problemHard,
                        github_name: githubdata.name,
                        public_repos: githubdata.public_repos,
                        github_bio: githubdata.bio,
                        repos: githubdata.repos,
                        followers: githubdata.followers,
                    })
                    .eq("id", user.id); // <-- Important: Specify which user to update

                if (updateError) {
                    console.error(
                        `Failed to update stats for ${user.name}:`,
                        updateError.message
                    );
                } else {
                    console.log(`Successfully updated stats for ${user.name}`);
                }
            } catch (e) {
                console.error(
                    `An error occurred while processing user ${user.name}:`,
                    e.message
                );
            }
        });

        await Promise.all(updatePromises);

        console.log("Nightly stat update completed.");
        return NextResponse.json({
            success: true,
            message: "Nightly update completed.",
        });
    } catch (error) {
        console.error("Cron job failed:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
