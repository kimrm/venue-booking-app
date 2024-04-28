import type { NextApiRequest, NextApiResponse } from "next";
import { API_AUTH_URL, API_URL } from "@/vars/api";
import { NoroffAPIRequest } from "@/types/Request";

type ResponseData = {
	status: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const api_url = `${API_AUTH_URL}/login`;

	const body = {
		email: req.body.email,
		password: req.body.password,
	};

	if (req.method !== "POST") {
		res.status(405).json({
			status: "Method Not Allowed",
		});
		return;
	}

	if (!body.email || !body.password) {
		res.status(400).json({
			status: "Missing input",
		});
		return;
	}

	const fetchResponse = await fetch(api_url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await fetchResponse.json();

	if (fetchResponse.ok) {
		const accessToken = data.data.accessToken;
		const userName = data.data.name;
		res.setHeader(
			"Set-Cookie",
			`accesstoken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
		);
		res.appendHeader(
			"Set-Cookie",
			`username=${userName}; Path=/; HttpOnly; Secure; SameSite=Strict`
		);
		const previousLogins = req.cookies.logins
			? parseInt(req.cookies.logins)
			: 0;
		res.appendHeader(
			"Set-Cookie",
			`logins=${previousLogins + 1}; Path=/; HttpOnly; Secure; SameSite=Strict`
		);

		data.data.logins = previousLogins + 1;

		try {
			const profileData = await fetchProfile(userName, accessToken);

			res.status(200).json(profileData);
		} catch (error) {
			res.status(401).json({
				status: "Unauthorized",
			});
		}

		return;
	}

	res.status(401).json(data);
}

async function fetchProfile(name: string, accessToken: string): Promise<any> {
	const api_url = `${API_URL}/profiles/${name}`;
	const response = await fetch(api_url, <NoroffAPIRequest>{
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
	});
	const data = await response.json();
	return data.data;
}
