import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const file = await fs.readFile(
		process.cwd() + "/src/data/restcountries.json",
		"utf8"
	);
	const data = JSON.parse(file);
	res.status(200).json(data);
}
