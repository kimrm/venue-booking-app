import { NextApiRequest, NextApiResponse } from "next";
import { countries } from "@/vars/countries";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(countries);
}
