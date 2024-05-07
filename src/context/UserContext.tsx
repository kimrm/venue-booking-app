"use client";
import { createContext, useEffect, useMemo, useState } from "react";
import UserProfile from "@/types/UserProfile";

export interface UserContextType {
	profile: UserProfile | undefined;
	setProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>;
}

export const UserContext = createContext<UserContextType | undefined>(
	undefined
);

export default function UserProvider({
	children,
	initialData,
}: {
	children: React.ReactNode;
	initialData?: UserProfile;
}) {
	const [profile, setProfile] = useState<UserProfile | undefined>(initialData);
	const contextValue: UserContextType = useMemo(() => {
		return { profile, setProfile };
	}, [profile, setProfile]);

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
}
