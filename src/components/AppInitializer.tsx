"use client";

import UserProvider from "@/context/UserContext";
import UiContextProvider from "@/context/UiContext";
import DataContextProvider from "@/context/DataContext";
import App from "./App";

interface UserProfile {
	name: string;
	email: string;
	bio?: string;
	avatar?: {
		url: string;
		alt: string;
	};
	banner?: {
		url: string;
		alt: string;
	};
	venueManager: boolean;
	logins: number;
}

interface Props {
	children?: React.ReactNode;
	userProfile?: UserProfile;
}

export default function AppInitializer({ children, userProfile }: Props) {
	return (
		<UserProvider initialData={userProfile}>
			<UiContextProvider>
				<DataContextProvider>
					<App>{children}</App>
				</DataContextProvider>
			</UiContextProvider>
		</UserProvider>
	);
}
