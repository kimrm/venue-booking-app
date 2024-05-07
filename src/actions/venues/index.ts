"use server";

import { NoroffAPIRequest } from "@/types/Request";
import { API_URL } from "@/vars/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

function createUniqueKeysToMediaArray(data: any) {
	return {
		data: {
			...data.data,
			media: data.data.media.map((item: any, index: number) => {
				return {
					...item,
					id: index + 1,
				};
			}),
		},
	};
}

export async function getVenuesForProfile() {
	const accessToken = cookies().get("accesstoken")?.value;
	const userName = cookies().get("username")?.value;

	const options: NoroffAPIRequest = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const response = await fetch(
		`${API_URL}/profiles/${userName}/venues`,
		options
	);
	const data = await response.json();

	return data.data;
}

export async function getById(id: string) {
	const accessToken = cookies().get("accesstoken")?.value;

	const options: NoroffAPIRequest = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const response = await fetch(
		`${API_URL}/venues/${id}?_owner=true&_bookings=true`,
		options
	);
	const data = await response.json();

	const processedData = createUniqueKeysToMediaArray(data);

	return processedData.data;
}

export async function create(prevState: any, formData: FormData) {
	const accessToken = cookies().get("accesstoken")?.value;

	const imageArray = formData.getAll("media").map((item) => {
		return { url: item.toString(), alt: item.toString() };
	});
	const requestData = {
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		maxGuests: parseInt(formData.get("maxGuests") as string),
		price: parseInt(formData.get("price") as string),
		rating: 0,
		meta: {
			wifi: formData.get("wifi") === "on",
			parking: formData.get("parking") === "on",
			breakfast: formData.get("breakfast") === "on",
			pets: formData.get("pets") === "on",
		},
		location: {
			address: formData.get("address") as string,
			city: formData.get("city") as string,
			zip: formData.get("zip") as string,
			country: formData.get("country") as string,
			continent: formData.get("continent") as string,
			lat: parseInt((formData.get("lat") as string) || "0"),
			long: parseInt((formData.get("long") as string) || "0"),
		},
		media:
			formData.getAll("media") &&
			formData
				.getAll("media")
				.map((item) => {
					return { url: item as string, alt: formData.get("name") as string };
				})
				.filter((item) => item.url !== ""),
	};

	const options: NoroffAPIRequest = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(requestData),
	};

	const response = await fetch(`${API_URL}/venues`, options);
	const data = await response.json();

	return { data: data, status: "ok" };
}

export async function update(prevState: any, formData: FormData) {
	const accessToken = cookies().get("accesstoken")?.value;

	const id = formData.get("id") as string;

	const requestData = {
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		maxGuests: parseInt(formData.get("maxGuests") as string),
		price: parseInt(formData.get("price") as string),
		rating: 0,
		meta: {
			wifi: formData.get("wifi") === "on",
			parking: formData.get("parking") === "on",
			breakfast: formData.get("breakfast") === "on",
			pets: formData.get("pets") === "on",
		},
		location: {
			address: formData.get("address") as string,
			city: formData.get("city") as string,
			zip: formData.get("zip") as string,
			country: formData.get("country") as string,
			continent: formData.get("continent") as string,
			lat: parseInt((formData.get("lat") as string) || "0"),
			long: parseInt((formData.get("long") as string) || "0"),
		},
		media: JSON.parse(formData.get("media") as string),
	};

	const options: NoroffAPIRequest = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": process.env.API_KEY,
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(requestData),
	};
	console.log(options);

	const response = await fetch(`${API_URL}/venues/${id}`, options);
	const data = await response.json();

	revalidatePath(`/venues/${id}`);

	return { data: data, status: "ok" };
}