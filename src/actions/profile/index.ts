"use server";
import { cookies } from "next/headers";
import { NoroffAPIRequest, ProfileRequestBody } from "@/types/Request";
import { API_URL } from "@/vars/api";

export async function getProfile() {
	const accessToken = cookies().get("accesstoken");
	const userName = cookies().get("username");

	if (accessToken && userName) {
		const options: NoroffAPIRequest = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken.value}`,
				"X-Noroff-API-Key": process.env.API_KEY,
			},
		};
		const response = await fetch(
			`${API_URL}/profiles/${userName.value}?_bookings=true`,
			options
		);
		const data = await response.json();

		return data.data;
	}
	return undefined;
}

export async function updateProfile(profile: ProfileRequestBody) {
	const accessToken = cookies().get("accesstoken");
	const userName = cookies().get("username");

	if (accessToken && userName) {
		const options: NoroffAPIRequest = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken.value}`,
				"X-Noroff-API-Key": process.env.API_KEY,
			},
			body: JSON.stringify(profile),
		};
		const response = await fetch(
			`${API_URL}/profiles/${userName.value}`,
			options
		);
		const data = await response.json();

		return data;
	}
	return undefined;
}
