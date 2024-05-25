"use server";

import { NoroffAPIRequest } from "@/types/Request";
import { API_URL } from "@/vars/api";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
	name: z.string().min(1, "Name is required."),
	description: z.string().min(1, "Description is required."),
	price: z
		.number({ message: "Price must be a number." })
		.int("Price must be a integer.")
		.min(0, "Price is required.")
		.max(10000, "Price can not be more than 10000."),
	maxGuests: z
		.number({ message: "Max guests must be a number." })
		.int("Max guests must be a integer.")
		.min(1, "Max guests is required.")
		.max(100, "Max guests can not be more than 100."),
});

function createUniqueKeysToMediaArray(data: any) {
	return {
		data: {
			...data.data,
			media: data.data.media?.map((item: any, index: number) => {
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
		next: { tags: ["profile-venues"] },
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

	if (!response.ok) {
		return {
			status: "error",
			code: response.status,
			data: await response.json(),
		};
	}

	const data = await response.json();

	const processedData = createUniqueKeysToMediaArray(data);

	return processedData.data;
}

export async function create(prevState: any, formData: FormData) {
	const accessToken = cookies().get("accesstoken")?.value;

	if (!accessToken) {
		redirect("/login");
	}

	const validatedFields = schema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		price: parseInt(formData.get("price") as string),
		maxGuests: parseInt(formData.get("maxGuests") as string),
	});

	if (!validatedFields.success) {
		return {
			status: "error",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const requestData = {
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		maxGuests: parseInt(formData.get("maxGuests") as string),
		price: parseInt(formData.get("price") as string),
		rating: 0,
		meta: {
			wifi: formData.get("wifi") === "1",
			parking: formData.get("parking") === "1",
			breakfast: formData.get("breakfast") === "1",
			pets: formData.get("pets") === "1",
		},
		location: {
			address: formData.get("address") as string,
			city: formData.get("city") as string,
			zip: formData.get("zip") as string,
			country: formData.get("country") as string,
			continent: formData.get("continent") as string,
			lat: parseFloat((formData.get("lat") as string) || "0"),
			lng: parseFloat((formData.get("lng") as string) || "0"),
		},
		media:
			formData.getAll("media") &&
			formData.getAll("media").map((item) => {
				return JSON.parse(item.toString());
			}),
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
	if (!response.ok) {
		return { status: "error", data: await response.json() };
	}
	const data = await response.json();

	revalidateTag("venues");
	permanentRedirect(
		`/profile/venues/${data.data.id}?toast=register-venue-successful`
	);
}

export async function update(prevState: any, formData: FormData) {
	const accessToken = cookies().get("accesstoken")?.value;

	if (!accessToken) {
		redirect("/login");
	}

	const validatedFields = schema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		price: parseInt(formData.get("price") as string),
		maxGuests: parseInt(formData.get("maxGuests") as string),
	});

	if (!validatedFields.success) {
		return {
			status: "error",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const id = formData.get("id") as string;

	const requestData = {
		name: formData.get("name") as string,
		description: formData.get("description") as string,
		maxGuests: parseInt(formData.get("maxGuests") as string),
		price: parseInt(formData.get("price") as string),
		rating: 0,
		meta: {
			wifi: formData.get("wifi") === "1",
			parking: formData.get("parking") == "1",
			breakfast: formData.get("breakfast") === "1",
			pets: formData.get("pets") === "1",
		},
		location: {
			address: formData.get("address") as string,
			city: formData.get("city") as string,
			zip: formData.get("zip") as string,
			country: formData.get("country") as string,
			continent: formData.get("continent") as string,
			lat: parseFloat((formData.get("lat") as string) || "0"),
			lng: parseFloat((formData.get("lng") as string) || "0"),
		},
		media:
			formData.getAll("media") &&
			formData.getAll("media").map((item) => {
				return JSON.parse(item.toString());
			}),
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

	const response = await fetch(`${API_URL}/venues/${id}`, options);
	const data = await response.json();

	revalidateTag("backend-search");

	return { data: data, status: "ok" };
}

export async function destroy(id: string) {
	const accessToken = cookies().get("accesstoken")?.value;
	const response = await fetch(`${API_URL}/venues/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"X-Noroff-Api-Key": process.env.API_KEY,
		},
	} as NoroffAPIRequest);

	console.log("Response ----------------", response);

	if (response.status === 204) {
		revalidateTag("venues");
		revalidatePath("/profile/venues");
		return { status: "ok", data: {} };
	}

	return { status: "error", data: {} };
}
