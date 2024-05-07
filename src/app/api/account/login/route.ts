import { API_AUTH_URL } from "@/vars/api";

export async function POST(request: Request) {
	const res = await request.json();

	const fetchResponse = await fetch(`${API_AUTH_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(res),
	});

	const data = await fetchResponse.json();

	return new Response(JSON.stringify(data), {
		status: fetchResponse.status,
		headers: {
			"Content-Type": "application/json",
			"Set-Cookie": `accesstoken=${data.data.accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict, username=${data.data.name}; Path=/; HttpOnly; Secure; SameSite=Strict`,
		},
	});
}
