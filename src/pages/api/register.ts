import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	status: string;
};

type RequestData = {
	name: string;
	email: string;
	password: string;
	isVenueManager: boolean;
	avatar?: {
		alt?: string;
		url?: string;
	};
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const api_url = "https://v2.api.noroff.dev/auth/register";
	const API_KEY = "74f572d2-19b2-4919-8edd-45508b626fed";

	const body: RequestData = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		isVenueManager: req.body.isVenueManager ?? false,
	};

	if (req.body.avatarUrl !== "") {
		body.avatar = {
			alt: req.body.name,
			url: req.body.avatarUrl,
		};
	}

	if (req.method !== "POST") {
		res.status(405).json({
			status: "Method Not Allowed",
		});
		return;
	}

	if (!body.name || !body.email || !body.password) {
		res.status(400).json({
			status:
				"Missing required inputs. Please provide name, email, and password.",
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
		res.status(200).json(data.data);
		return;
	}

	const statusCode = data.statusCode ?? 400;

	res.status(statusCode).json(data);
}
