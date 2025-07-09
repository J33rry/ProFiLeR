import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    try {
        const [userInfoRes, userRatingRes] = await Promise.all([
            fetch(`https://codeforces.com/api/user.info?handles=${username}`),
            fetch(`https://codeforces.com/api/user.rating?handle=${username}`),
        ]);

        if (!userInfoRes.ok || !userRatingRes.ok) {
            return NextResponse.json(
                { error: "Failed to fetch data from Codeforces" },
                { status: userInfoRes.status || userRatingRes.status || 500 }
            );
        }

        const userInfo = await userInfoRes.json();
        const userRating = await userRatingRes.json();

        if (userInfo.status === "FAILED" || userRating.status === "FAILED") {
            return NextResponse.json(
                {
                    error:
                        userInfo.comment ||
                        userRating.comment ||
                        "User not found on Codeforces",
                },
                { status: 404 }
            );
        }

        const data = {
            username: username,
            rating: userInfo.result[0]?.rating,
            rank: userInfo.result[0]?.rank,
            contests: userRating.result.map((contest) => ({
                contestName: contest.contestName,
                rank: contest.rank,
                oldRating: contest.oldRating,
                newRating: contest.newRating,
            })),
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error("Codeforces API error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
