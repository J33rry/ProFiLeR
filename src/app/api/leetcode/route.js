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

    const data = await response.json();
    if (!data.data || !data.data.matchedUser) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }
    return new Response(JSON.stringify(data.data.matchedUser), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
