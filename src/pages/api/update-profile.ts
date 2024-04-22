import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	status: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const userName = req.cookies.username;

	const accessToken = req.cookies.accesstoken;

	if (!accessToken) {
		res.status(401).json({ status: "Unauthorized" });
		return;
	}

	const api_url = `https://v2.api.noroff.dev/holidaze/profiles/${userName}`;
	const API_KEY = "74f572d2-19b2-4919-8edd-45508b626fed";

	const fetchResponse = await fetch(api_url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
		body: req.body,
	});

	const data = await fetchResponse.json();

	if (fetchResponse.ok) {
		res.status(200).json(data.data);
		return;
	}

	res.status(401).json(data);
}
