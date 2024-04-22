import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	message: string;
	logged_in: boolean;
	token?: string;
};

function parseCookies(
	cookieString: string | undefined
): Record<string, string> {
	const list: Record<string, string> = {};
	cookieString?.split(";").forEach((cookie) => {
		const parts = cookie.split("=");
		const key = parts.shift()?.trim();
		if (key) {
			list[key] = decodeURIComponent(parts.join("="));
		}
	});
	return list;
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	const cookies = parseCookies(req.headers.cookie);

	// Extract the token (cookie value)
	const token = cookies.token;

	if (!token) {
		res.status(401).json({ message: "Not logged in", logged_in: false });
		return;
	}
	res.status(200).json({
		message: "Hello from Next.js!",
		logged_in: true,
		token: token,
	});
}
