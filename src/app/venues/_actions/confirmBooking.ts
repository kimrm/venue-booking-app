"use server";
import { API_URL } from "@/vars/api";
import { cookies } from "next/headers";
import { NoroffAPIRequest } from "@/types/Request";

export default async function confirmBooking(
	prevState: any,
	formData: FormData
) {
	const cookieStore = cookies();
	const token = cookieStore.get("accesstoken")?.value;

	const requestData = {
		venueId: formData.get("venueId"),
		dateFrom: formData.get("startDate"),
		dateTo: formData.get("endDate"),
		guests: parseInt(formData.get("guests") as string),
	};

	if (!token) {
		return {
			success: false,
			message: "Unauthorized",
			data: { status: 401 },
		};
	}

	const response = await fetch(`${API_URL}/bookings`, <NoroffAPIRequest>{
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			"X-Noroff-Api-Key": process.env.API_KEY,
		},
		body: JSON.stringify(requestData),
	});

	const responseData = await response.json();

	if (response.ok) {
		return {
			success: true,
			message: "Booking confirmed",
			data: responseData.data,
		};
	}
	return {
		success: false,
		message: "Booking failed",
		data: responseData,
	};
}
