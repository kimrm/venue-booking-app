import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "@/vars/api";
import { NoroffAPIRequest } from "@/types/Request";

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

	const api_url = `${API_URL}/profiles/${userName}`;

	const fetchResponse = await fetch(api_url, <NoroffAPIRequest>{
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
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
