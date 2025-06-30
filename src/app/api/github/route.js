export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
        return new Response(
            JSON.stringify({
                error: `Failed to fetch user: ${res.statusText}`,
            }),
            { status: res.status }
        );
    }

    const data = await res.json();

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
