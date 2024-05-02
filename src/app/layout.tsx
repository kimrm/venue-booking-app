import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppInitializer from "@/components/AppInitializer";
import { cookies } from "next/headers";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/figtree";
import { API_URL } from "@/vars/api";
import { NoroffAPIRequest } from "@/types/Request";
import { Suspense } from "react";
import InitialLoading from "@/components/loaders/InitialLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Holidation",
	description: "Rent a venue for your next event",
};

async function getProfile() {
	const accessToken = cookies().get("accesstoken");
	const userName = cookies().get("username");
	let logins = cookies().get("logins");

	if (accessToken && userName) {
		const options: NoroffAPIRequest = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken.value}`,
				"X-Noroff-API-Key": process.env.API_KEY,
			},
		};
		const response = await fetch(
			`${API_URL}/profiles/${userName.value}`,
			options
		);
		const data = await response.json();

		data.data.logins = logins?.value ?? 0;

		return data.data;
	}
	return undefined;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const profile = await getProfile();

	return (
		<html lang="en">
			<body className="min-h-screen">
				<AppInitializer userProfile={profile}>{children}</AppInitializer>
			</body>
		</html>
	);
}
