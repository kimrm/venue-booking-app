import type { NextApiRequest, NextApiResponse } from "next";
import { NoroffAPIRequest } from "@/types/Request";
import { API_URL } from "@/vars/api";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	const response = await fetch(
		`${API_URL}/venues/${id}?_owner=true&_bookings=true`,
		<NoroffAPIRequest>{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-Noroff-API-Key": process.env.API_KEY,
			},
		}
	);
	const data = await response.json();

	const processedData = createUniqueKeysToMediaArray(data);

	res.status(200).json(processedData);
}

function createUniqueKeysToMediaArray(data: any) {
	return {
		data: {
			...data.data,
			media: data.data.media.map((item: any, index: number) => {
				return {
					...item,
					id: index + 1,
				};
			}),
		},
	};
}
