import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL, API_AUTH_URL } from "@/vars/api";
import { NoroffAPIRequest } from "@/types/Request";

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

	const fetchResponse = await fetch(`${API_AUTH_URL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await fetchResponse.json();

	if (fetchResponse.status === 201) {
		if (req.body.isVenueManager) {
			setVenueManager(req.body.email, req.body.password);
		}
		res.status(200).json(data.data);
		return;
	}

	const statusCode = data.statusCode ?? 400;

	res.status(statusCode).json(data);
}

async function setVenueManager(email: string, password: string) {
	// get access token and update profile if user is a venue manager
	try {
		const loginResponse = await fetch(`${API_AUTH_URL}/login`, <
			NoroffAPIRequest
		>{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const loginData = await loginResponse.json();
		const accessToken = loginData.data.accessToken;

		fetch(`${API_URL}/profiles/${loginData.data.name}`, <NoroffAPIRequest>{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"X-Noroff-API-Key": process.env.API_KEY,
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				venueManager: true,
			}),
		});
	} catch (error) {
		console.error(error);
	}
}
