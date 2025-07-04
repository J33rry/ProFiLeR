export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_PAT_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        return new Response(
            JSON.stringify({
                error: `Failed to fetch user: ${res.statusText}`,
            }),
            { status: res.status }
        );
    }

    const userinfo = await res.json();

    const res1 = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_PAT_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
    if (!res1.ok) {
        return new Response(
            JSON.stringify({
                error: `Failed to fetch repositories: ${res1.statusText}`,
            }),
            { status: res1.status }
        );
    }

    const repos = await res1.json();

    const data = {
        username: username,
        name: userinfo.name,
        avatar_url: userinfo.avatar_url,
        bio: userinfo.bio,

        public_repos: userinfo.public_repos,
        repos: repos.map((repo) => ({
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            langauge: repo.language,
        })),
    };

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
