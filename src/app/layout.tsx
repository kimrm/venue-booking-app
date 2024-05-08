import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/figtree";
import { Suspense } from "react";
import InitialLoading from "@/components/loaders/InitialLoading";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getProfile } from "@/actions/profile";
import UserProvider from "@/context/UserContext";
import UiContextProvider from "@/context/UiContext";
import DataContextProvider from "@/context/DataContext";
import UserProfile from "@/types/UserProfile";

export const metadata: Metadata = {
	title: "Holidation",
	description: "Rent a venue for your next event",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const profile: UserProfile = await getProfile();

	return (
		<html lang="en">
			<body className="min-h-screen">
				<div className="container mx-auto px-4">
					<div className="flex h-screen flex-col">
						<UserProvider initialData={profile}>
							<UiContextProvider>
								<DataContextProvider>
									<Header />
									<Suspense fallback={<InitialLoading />}>
										<main className="flex-grow">{children}</main>
									</Suspense>
									<Footer />
								</DataContextProvider>
							</UiContextProvider>
						</UserProvider>
					</div>
				</div>
			</body>
		</html>
	);
}
