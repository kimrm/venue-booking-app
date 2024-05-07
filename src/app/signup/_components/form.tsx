"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { registerAction } from "@/app/signup/_actions/register";
import Toggle from "@/components/form/toggle";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterForm() {
	const [state, formAction] = useFormState(registerAction, {
		data: {},
		success: false,
		message: "",
	});

	useEffect(() => {
		if (state) {
			console.log("Registration successful", state);
		}
	}, [state]);

	if (state.success) {
		return (
			<>
				<p className="my-5 font-bold">Registration successful!</p>
				<Link
					className="rounded-xl bg-yellow-500 px-4 py-2 font-bold text-yellow-950 transition-all duration-300 hover:bg-yellow-600 hover:text-yellow-200"
					href="/login"
				>
					Go to login
				</Link>
			</>
		);
	}
	return (
		<form action={formAction}>
			<Input
				title="Choose a username"
				name="name"
				id="name"
				type="text"
				maxLength={20}
				required
			>
				{state.errors?.name && (
					<p className="text-sm text-red-500">{state.errors.name[0]}</p>
				)}
			</Input>
			<Input
				title="Your e-mail address"
				id="email"
				name="email"
				type="email"
				required
			>
				{state.errors?.email && (
					<p className="text-sm text-red-500">{state.errors.email[0]}</p>
				)}
			</Input>
			<Input
				title="Set a password"
				id="password"
				name="password"
				type="password"
				required
			>
				{state.errors?.password && (
					<p className="text-sm text-red-500">{state.errors.password[0]}</p>
				)}
			</Input>
			<Input
				title="Confirm the password"
				id="passwordConfirmation"
				name="passwordConfirmation"
				type="password"
				required
			>
				{state.errors?.passwordConfirmation && (
					<p className="text-sm text-red-500">
						{state.errors.passwordConfirmation[0]}
					</p>
				)}
			</Input>

			<div className="mb-10">
				<h3 className="mb-1">Do you want to list your home?</h3>
				<p className="mb-3 text-sm text-gray-700">
					You can decide later if you want.
				</p>
				<Toggle onText="yes" offText="no" />
			</div>

			<SubmitButton />
			{state.message && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="my-10 flex items-center gap-4 font-bold text-red-500"
				>
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

					<p>{state?.message}</p>
				</motion.div>
			)}
			<p className="mt-5">
				Already have an account?{" "}
				<a href="/login" className="text-orange-400">
					Log in
				</a>
			</p>
		</form>
	);
}

function Input({
	children,
	...rest
}: {
	children: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<div className="mb-3">
			<label htmlFor={rest.id} className="mb-2 block">
				{rest.title}
			</label>
			<input
				className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
				{...rest}
			/>
			{children}
		</div>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			className={`flex cursor-pointer items-center gap-2 rounded-xl border bg-yellow-300 px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-yellow-400`}
			disabled={pending}
		>
			{pending ? "Processing.." : "Sign up"}
		</button>
	);
}
