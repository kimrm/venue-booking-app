import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	status: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	res.setHeader(
		"Set-Cookie",
		"token=123123123; Path=/; HttpOnly; Secure; SameSite=Strict"
	);

	//res.setHeader("Set-Cookie", "token=123123123; Path=/; SameSite=Strict");

	res.status(200).json({ status: "ok" });
}
