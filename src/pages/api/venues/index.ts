import type { NextApiRequest, NextApiResponse } from "next";
import Venue from "../../../app/types/Venue";

const API_KEY = "74f572d2-19b2-4919-8edd-45508b626fed";

async function getPage(limit: number, page: number) {
	const response = await fetch(
		`https://v2.api.noroff.dev/holidaze/venues?limit=${limit}&page=${page}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-Noroff-API-Key": API_KEY,
			},
		}
	);
	const data = await response.json();
	return data;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const limit = 15;
	let requestedPage: string = (req.query.page as string) ?? 1;
	const guests: string = req.query.guests as string;
	const maxPrice: string = req.query.max_price as string;
	const continent: string = req.query.continent as string;
	const country: string = req.query.country as string;
	const min_rating: string = req.query.min_rating as string;
	const wifi: string = req.query.wifi as string;
	const parking: string = req.query.parking as string;
	const breakfast: string = req.query.breakfast as string;
	const pets: string = req.query.pets as string;

	const hasFilter =
		guests ||
		maxPrice ||
		continent ||
		country ||
		min_rating ||
		wifi ||
		parking ||
		breakfast ||
		pets
			? true
			: false;

	let nextPage = 1;
	let repository = [];
	let totalCount = 0;
	let pageCount = 0;

	while (nextPage) {
		const fetchResponse = await getPage(limit, nextPage);
		if (hasFilter) {
			let filtered = fetchResponse.data;
			if (guests) {
				filtered = filtered.filter(
					(venue: Venue) => venue.maxGuests >= parseInt(guests)
				);
			}
			if (maxPrice) {
				filtered = filtered.filter(
					(venue: Venue) => venue.price <= parseInt(maxPrice)
				);
			}
			if (continent) {
				filtered = filtered.filter(
					(venue: Venue) =>
						venue.location.continent?.toLowerCase() === continent.toLowerCase()
				);
			}
			if (country) {
				filtered = filtered.filter(
					(venue: Venue) =>
						venue.location.country?.toLowerCase() === country.toLowerCase()
				);
			}
			if (min_rating) {
				filtered = filtered.filter(
					(venue: Venue) => venue.rating >= parseInt(min_rating)
				);
			}
			if (wifi === "true") {
				filtered = filtered.filter((venue: Venue) => venue.meta.wifi === true);
			}
			if (parking == "true") {
				filtered = filtered.filter(
					(venue: Venue) => venue.meta.parking === true
				);
			}
			if (breakfast === "true") {
				filtered = filtered.filter(
					(venue: Venue) => venue.meta.breakfast === true
				);
			}
			if (pets === "true") {
				filtered = filtered.filter((venue: Venue) => venue.meta.pets === true);
			}
			repository.push(filtered);
			totalCount += filtered.length;
		} else {
			totalCount += fetchResponse.data.length;
			repository.push(fetchResponse.data);
		}
		nextPage = fetchResponse.meta.nextPage;
		// safeguard against infinite or too long loop
		if (nextPage > 50) {
			break;
		}
	}

	let flattened = repository.flat();

	pageCount =
		Math.ceil(flattened.length / limit) === 0
			? 1
			: Math.ceil(flattened.length / limit);

	if (parseInt(requestedPage) > pageCount) {
		res.status(404).json({ message: "Page not found" });
		return;
	}

	const meta = {
		totalCount: totalCount,
		pageCount: pageCount,
		currentPage: parseInt(requestedPage),
		isFirstPage: parseInt(requestedPage) === 1,
		isLastPage: parseInt(requestedPage) === pageCount,
		previousPage:
			parseInt(requestedPage) - 1 < 1 ? null : parseInt(requestedPage) - 1,
		nextPage:
			parseInt(requestedPage) + 1 > pageCount
				? null
				: parseInt(requestedPage) + 1,
	};

	const startFrom = (parseInt(requestedPage) - 1) * limit;
	const endAt = startFrom + limit > totalCount ? totalCount : startFrom + limit;

	const responseObject = {
		data: flattened.slice(startFrom, endAt),
		meta: meta,
	};

	res.status(200).json(responseObject);
}
