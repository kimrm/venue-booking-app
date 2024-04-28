"use client";

import { useState, useEffect } from "react";
import RegisterForm from "@/components/register";
import { usePostFetch } from "@/hooks/api";

type RegisterData = {
	name: string;
	email: string;
	password: string;
	avatarUrl?: string;
	isVenueManager: boolean;
};

export default function SignupPage() {
	const [signupData, setSignupData] = useState<RegisterData | null>(null);
	const { data, loading, error } = usePostFetch("/api/register", signupData);
	const [errorFeedback, setErrorFeedback] = useState<string | null>(null);

	useEffect(() => {
		if (!data) return;
		console.log("usePostFetch data: ", data);
	}, [data]);

	useEffect(() => {
		if (!error) return;
		if (error.code === "400") {
			console.log("error: ", error);
			if (
				error.errors &&
				error.errors[0].message === "Profile already exists"
			) {
				setErrorFeedback(
					"The information provided cannot be used for registration. If you already have an account, please try logging in."
				);
			} else {
				setErrorFeedback(
					"Could not register your profile. Please check the avatar URL if it's a valid HTTPS URL and that the image is accessible."
				);
			}
		}
	}, [error]);

	function handleRegisterCallback(registerData: RegisterData) {
		console.log("registerData: ", registerData);
		setSignupData(registerData);
	}
	return (
		<div className="flex min-h-full flex-grow items-center ">
			<div className="mx-auto w-full bg-slate-100 p-10 sm:rounded-xl lg:mx-auto lg:w-1/2">
				<h1 className="mb-3 font-serif text-2xl font-bold">
					Sign up to start your journey
				</h1>
				<h2 className="mb-10">
					... or start listing your home for rent and make money.
				</h2>
				<RegisterForm submitCallback={handleRegisterCallback} error={error} />
				{error && (
					<div className="my-10 flex items-center gap-4 font-bold text-red-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-10 w-10"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
							/>
						</svg>

						<p>{errorFeedback}</p>
					</div>
				)}
				<p className="mt-5">
					Already have an account?{" "}
					<a href="/login" className="text-orange-400">
						Log in
					</a>
				</p>
			</div>
		</div>
	);
}
