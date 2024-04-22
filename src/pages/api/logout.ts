import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		res.setHeader(
			"Set-Cookie",
			`accesstoken=; Path=/; HttpOnly; Secure; SameSite=Strict; expires=${new Date(
				0
			).toUTCString()}`
		);
		res.appendHeader(
			"Set-Cookie",
			`username=; Path=/; HttpOnly; Secure; SameSite=Strict; expires=${new Date(
				0
			).toUTCString()}`
		);
		res.status(200).json({ status: "ok" });
		return;
	}
	res.status(405).json({ status: "Method Not Allowed" });
}
