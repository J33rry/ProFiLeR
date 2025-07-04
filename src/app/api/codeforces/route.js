export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${username}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (res.status === "FAILED") {
        return new Response(
            JSON.stringify({
                error: `Failed to fetch user: ${res.statusText}`,
            }),
            { status: 404 }
        );
    }

    // return new Response(JSON.stringify(userinfo), {
    //     status: 200,
    //     headers: { "Content-Type": "application/json" },
    // });

    const res1 = await fetch(
        `https://codeforces.com/api/user.rating?handle=${username}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (res1.status == "FAILED") {
        return new Response(
            JSON.stringify({
                error: `Failed to fetch contests ${res1.statusText}`,
            }),
            { status: 404 }
        );
    }

    const userinfo = await res.json();
    const contests = await res1.json();

    const data = {
        username: username,
        rating: userinfo.result[0]?.rating,
        rank: userinfo.result[0]?.rank,
        contests: contests.result.map((contest) => ({
            contestName: contest.contestName,
            rank: contest.rank,
            oldRating: contest.oldRating,
            newRating: contest.newRating,
        })),
    };

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
