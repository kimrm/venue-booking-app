"use server";

import { NoroffAPIRequest } from "@/types/Request";
import Booking from "@/types/Booking";
import Venue from "@/types/Venue";
import { API_URL } from "@/vars/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";

interface BookingResponse {
	data: Booking;
	meta: any;
}

interface VenuesResponse {
	data: Venue[];
	meta: any;
}

export async function getAllBookings(): Promise<Booking[]> {
	const accessToken = cookies().get("accesstoken")?.value;
	const username = cookies().get("username")?.value;

	if (!accessToken) {
		redirect("/login");
	}

	const options: NoroffAPIRequest = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const response: Response = await fetch(
		`${API_URL}/profiles/${username}/venues?_bookings=true&_venues=true`,
		options
	);
	const data: VenuesResponse = await response.json();

	const bookings: Booking[] = data.data
		.map((venue: Venue) => {
			return (
				venue.bookings?.map((booking: Booking) => {
					booking.venue = venue;
					return booking;
				}) ?? []
			);
		})
		.flat();

	return bookings;
}

export async function getBookingById(id: string): Promise<Booking> {
	const accessToken = cookies().get("accesstoken")?.value;

	if (!accessToken) {
		redirect("/login");
	}

	const options: NoroffAPIRequest = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const response: Response = await fetch(
		`${API_URL}/bookings/${id}?_venue=true&_customer=true&_owner=true`,
		options
	);
	const data: BookingResponse = await response.json();

	return <Booking>data.data;
}

export async function deleteBooking(id: string): Promise<void> {
	const accessToken = cookies().get("accesstoken")?.value;

	if (!accessToken) {
		redirect("/login");
	}

	const options: NoroffAPIRequest = {
		next: { tags: ["booking", id] },
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
	};

	await fetch(`${API_URL}/bookings/${id}`, options);

	redirect("/profile/bookings");
}

export async function getRating(id: string): Promise<number> {
	const accessToken = cookies().get("accesstoken")?.value;
	const username = cookies().get("username")?.value;

	if (!accessToken) {
		redirect("/login");
	}

	if (id === "") {
		return 0;
	}

	const { rows } =
		await sql`select rating from venue_booking_app_ratings where venue_id=${id} and user_name=${username}`;

	return rows[0]?.rating ?? 0;
}

export async function rateVenue(id: string, newRating: number): Promise<void> {
	const accessToken = cookies().get("accesstoken")?.value;
	const username = cookies().get("username")?.value;

	if (!accessToken) {
		redirect("/login");
	}

	const booking = await getBookingById(id);

	const oldRating = booking.venue?.rating ?? 0;

	await sql`INSERT INTO venue_booking_app_ratings (venue_id, user_name, rating)
    VALUES (${booking.venue?.id}, ${username}, ${newRating})
    ON CONFLICT (venue_id, user_name)
    DO UPDATE SET rating = EXCLUDED.rating;`;

	const { rows } =
		await sql`select sum(rating) as total_rating, count(venue_id) as total_count 
        from venue_booking_app_ratings 
        where venue_id=${booking?.venue?.id}`;

	// since the ratings in the API are disconnected from the
	// rating system of this app we add the old rating to the
	// totals to ensure it is included in the average
	const totalRating = rows[0].total_rating + oldRating;
	const totalCount = rows[0].total_count + (oldRating !== 0 ? 1 : 0);
	const averageRating = (totalRating / totalCount).toFixed(1);

	const options: NoroffAPIRequest = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({ ...booking.venue, rating: averageRating }),
	};

	await fetch(`${API_URL}/venues/${booking?.venue?.id}`, options);
}
