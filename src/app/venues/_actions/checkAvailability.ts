"use server";
import { API_URL } from "@/vars/api";

export default async function checkAvailability(
	prevState: any,
	formData: FormData
) {
	const venueId = formData.get("venueId") as string;
	const startDateStr = formData.get("startDate") as string;
	const endDateStr = formData.get("endDate") as string;
	const startDate = new Date(startDateStr);
	const endDate = new Date(endDateStr);

	const response = await fetch(`${API_URL}/venues/${venueId}?_bookings=true`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const responseData = await response.json();

	const bookings = responseData.data.bookings;

	if (bookings) {
		const availability = bookings.filter((booking: any) => {
			const bookingStart = new Date(booking.dateFrom);
			const bookingEnd = new Date(booking.dateTo);
			if (bookingStart >= startDate && bookingStart < endDate) {
				return true;
			}
			if (bookingEnd > startDate && bookingEnd < endDate) {
				return true;
			}
			return false;
		});

		return {
			data: { bookings: availability, availability: availability.length === 0 },
		};
	}
	return {
		data: { bookings: bookings, availability: false },
	};
}
