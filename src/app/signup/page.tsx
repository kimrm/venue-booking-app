"use client";

import { useState, useEffect } from "react";

import { usePostFetch } from "@/hooks/api";
import { motion } from "framer-motion";
import RegisterForm from "@/app/signup/_components/form";

type RegisterData = {
	name: string;
	email: string;
	password: string;
	avatarUrl?: string;
	isVenueManager: boolean;
};

export default function SignupPage() {
	return (
		<div className="flex min-h-full flex-grow items-center ">
			<div className="mx-auto w-full bg-slate-100 p-10 sm:rounded-xl lg:mx-auto lg:w-1/2">
				<h1 className="mb-3 font-serif text-2xl font-bold">
					Sign up to start your journey
				</h1>
				<h2 className="mb-10">
					... or start listing your home for rent and make money.
				</h2>
				<RegisterForm />
			</div>
		</div>
	);
}
