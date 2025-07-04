export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            operationName: "getUserProfile",
            variables: { username },
            query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              userAvatar
              ranking
              reputation
              countryName
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
      `,
        }),
    });
    const info = await response.json();
    if (!info.data || !info.data.matchedUser) {
        return new Response("User Not Found", { status: 404 });
    }
    const data = {
        username: username,
        name: info.data.matchedUser.profile.realName,
        ranking: info.data.matchedUser.profile.ranking,
        problemAll: info.data.matchedUser.submitStats.acSubmissionNum[0].count,
        problemEasy: info.data.matchedUser.submitStats.acSubmissionNum[1].count,
        problemMedium:
            info.data.matchedUser.submitStats.acSubmissionNum[2].count,
        problemHard: info.data.matchedUser.submitStats.acSubmissionNum[3].count,
    };
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
