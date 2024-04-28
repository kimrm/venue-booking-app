"use client";

import { useState } from "react";
import Toggle from "../form/toggle";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
	name: yup
		.string()
		.matches(
			/^[\w]+$/,
			"Please enter a username without spaces consisting of only letters, digits, or underscores."
		)
		.required("Your name is required.")
		.max(20, "Max 20 characters."),
	avatarUrl: yup
		.string()
		.matches(
			/^https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
			{
				message: "Must be a valid https URL.",
				excludeEmptyString: true,
				when: {
					is: (val: any) => val !== undefined && val !== null && val !== "",
				},
			}
		),
	isVenueManager: yup.boolean().default(false),
	email: yup
		.string()
		.matches(
			/^[\w\-.]+@(stud\.)?noroff\.no$/,
			"Must be a valid Noroff (noroff.no or stud.noroff.no) email address."
		)
		.required(),
	password: yup
		.string()
		.min(8, "Password must be minimum 8 characters.")
		.required(),
	passwordConfirmation: yup
		.string()
		.required("Please confirm your password.")
		.oneOf([yup.ref("password")], "Passwords must match."),
});

interface RegisterFormProps {
	submitCallback: (data: {
		name: string;
		email: string;
		password: string;
		avatarUrl: string;
		isVenueManager: boolean;
	}) => void;
	error: {
		code: string;
		message: string;
	} | null;
}

export default function RegisterForm({
	submitCallback,
	error,
}: RegisterFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const [isVenueManager, setIsVenueManager] = useState(false);

	function handleVenueManagerCheckChange(isChecked: boolean) {
		setIsVenueManager(isChecked);
	}

	function onSubmit(data: FieldValues) {
		const postData = {
			name: data.name,
			email: data.email,
			password: data.password,
			avatarUrl: data.avatarUrl,
			isVenueManager: isVenueManager,
		};

		submitCallback(postData);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-3">
				<label htmlFor="name" className="mb-2 block">
					Choose a username
				</label>
				<input
					className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
					title="Your name"
					maxLength={20}
					{...register("name")}
				/>
				{errors.name && (
					<p className="text-sm text-red-500">{errors.name.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="email" className="mb-2 block">
					Your e-mail
				</label>
				<input
					className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
					title="Your e-mail address"
					{...register("email")}
				/>
				{errors.email && (
					<p className="text-sm text-red-500">{errors.email.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="mb-2 block">
					Set a password
				</label>
				<input
					className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
					title="Set a password"
					type="password"
					{...register("password")}
				/>
				{errors.password && (
					<p className="text-sm text-red-500">{errors.password.message}</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="passwordConfirmation" className="mb-2 block">
					Confirm the password
				</label>
				<input
					className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
					title="Confirm the password"
					type="password"
					{...register("passwordConfirmation")}
				/>
				{errors.passwordConfirmation && (
					<p className="text-sm text-red-500">
						{errors.passwordConfirmation.message}
					</p>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="avatarUrl" className="mb-2 block">
					Avatar image url (https)
				</label>
				<input
					className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
					title="Your avatar image"
					{...register("avatarUrl")}
				/>
				{errors.avatarUrl && (
					<p className="text-sm text-red-500">{errors.avatarUrl.message}</p>
				)}
			</div>
			<div className="mb-10">
				<h3 className="mb-1">Do you want to list your home?</h3>
				<p className="mb-3 text-sm text-gray-700">
					You can decide later if you want.
				</p>
				<Toggle
					onText="yes"
					offText="no"
					onChange={handleVenueManagerCheckChange}
				/>
			</div>

			<button
				className={`flex items-center gap-2 rounded-xl border bg-yellow-300 ${Object.keys(errors).length > 0 || error ? "border border-red-500 " : " hover:scale-105 hover:bg-yellow-400"} px-4 py-2 transition-all duration-300  `}
				disabled={Object.keys(errors).length > 0}
			>
				{error && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="red"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
						/>
					</svg>
				)}
				Sign up
			</button>
		</form>
	);
}
