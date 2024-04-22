import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const api_url = "https://v2.api.noroff.dev/auth/login";
  const API_KEY = "74f572d2-19b2-4919-8edd-45508b626fed";

  const body = {
    email: req.body.email,
    password: req.body.password,
  };

  const fetchResponse = await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await fetchResponse.json();

  const accessToken = data.data.accessToken;
  const userName = data.data.name;

  if (fetchResponse.ok) {
    res.setHeader(
      "Set-Cookie",
      `accesstoken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );
    res.appendHeader(
      "Set-Cookie",
      `username=${userName}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );
    const previousLogins = req.cookies.logins
      ? parseInt(req.cookies.logins)
      : 0;
    res.appendHeader(
      "Set-Cookie",
      `logins=${previousLogins + 1}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );

    data.data.logins = previousLogins + 1;

    res.status(200).json(data.data);
    return;
  }

  res.status(401).json(data);
}
