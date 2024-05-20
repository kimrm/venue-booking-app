import { type NextRequest } from "next/server";
import { NoroffAPIRequest } from "@/types/Request";
import { API_URL } from "@/vars/api";
import Venue from "@/types/Venue";

async function getPage(limit: number, page: number, search: string = "") {
	const url =
		search !== ""
			? `${API_URL}/venues/search?q=${search}&`
			: `${API_URL}/venues?`;

	const response = await fetch(
		`${url}sort=updated&sortOrder=desc&limit=${limit}&page=${page}`,
		<NoroffAPIRequest>{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-Noroff-API-Key": process.env.API_KEY,
			},
		}
	);
	const data = await response.json();
	return data;
}

export async function GET(request: NextRequest) {
	const limit = 50;
	const searchParams = request.nextUrl.searchParams;
	let requestedPage: string = searchParams.get("page") ?? "1";
	const search: string = searchParams.get("search") as string;
	const guests: string = searchParams.get("guests") as string;
	const maxPrice: string = searchParams.get("max_price") as string;
	const city: string = searchParams.get("city") as string;
	const continent: string = searchParams.get("continent") as string;
	const country: string = searchParams.get("country") as string;
	const wifi: string = searchParams.get("wifi") as string;
	const parking: string = searchParams.get("parking") as string;
	const breakfast: string = searchParams.get("breakfast") as string;
	const pets: string = searchParams.get("pets") as string;

	const hasFilter =
		guests ||
		maxPrice ||
		city ||
		continent ||
		country ||
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
		const fetchResponse = await getPage(limit, nextPage, search);
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
			if (city) {
				filtered = filtered.filter(
					(venue: Venue) =>
						venue.location.city?.toLowerCase() === city.toLowerCase()
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

			if (wifi === "1") {
				filtered = filtered.filter((venue: Venue) => venue.meta.wifi === true);
			}
			if (parking == "1") {
				filtered = filtered.filter(
					(venue: Venue) => venue.meta.parking === true
				);
			}
			if (breakfast === "1") {
				filtered = filtered.filter(
					(venue: Venue) => venue.meta.breakfast === true
				);
			}
			if (pets === "1") {
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
		return Response.json({ message: "Page not found" }, { status: 404 });
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

	return Response.json(responseObject, { status: 200 });
}
