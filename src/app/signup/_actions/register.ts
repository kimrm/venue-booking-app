"use server";
import { z } from "zod";
import { API_AUTH_URL } from "@/vars/api";

const schema = z
	.object({
		name: z
			.string()
			.regex(
				/^[\w]+$/,
				"Please enter a username without spaces consisting of only letters, digits, or underscores."
			)
			.min(1, "Name is required.")
			.max(20, "Max 20 characters."),
		email: z
			.string()
			.regex(
				/^[\w\-.]+@(stud\.)?noroff\.no$/,
				"Must be a valid Noroff (noroff.no or stud.noroff.no) email address."
			),
		password: z.string().min(8, "Password must be minimum 8 characters."),
		passwordConfirmation: z
			.string()
			.min(8, "Password must be minimum 8 characters."),
	})
	.refine((data) => data.password === data.passwordConfirmation, {
		message: "Confirmed password must match password.",
		path: ["passwordConfirmation"],
	});

export async function registerAction(prevState: any, formData: FormData) {
	const toggleValue = formData.get("toggle") === "on" ? true : false;
	console.log(toggleValue);

	const validatedFields = schema.safeParse({
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		passwordConfirmation: formData.get("passwordConfirmation"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const requestData = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		venueManager: toggleValue,
	};

	console.log(requestData);

	const response = await fetch(`${API_AUTH_URL}/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestData),
	});

	const data = await response.json();

	if (!response.ok) {
		return {
			data: data,
			success: false,
			message:
				"The information provided cannot be used for registration. If you already have an account, please try logging in.",
		};
	}

	return { data: data, success: true, message: "" };
}
