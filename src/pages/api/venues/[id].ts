import type { NextApiRequest, NextApiResponse } from "next";
import Venue from "../../../app/types/Venue";

const API_KEY = "74f572d2-19b2-4919-8edd-45508b626fed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const response = await fetch(
    `https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true&_bookings=true`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": process.env.API_KEY ?? "",
      },
    }
  );
  const data = await response.json();

  res.status(200).json(data);
}
