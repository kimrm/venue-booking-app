export const dynamic = "force-dynamic";
export async function POST() {
	return new Response(JSON.stringify({ status: "ok" }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Set-Cookie": `accesstoken=; Path=/; HttpOnly; Secure; SameSite=Strict; expires=${new Date(
				0
			).toUTCString()}, username=; Path=/; HttpOnly; Secure; SameSite=Strict; expires=${new Date(
				0
			).toUTCString()}`,
		},
	});
}
