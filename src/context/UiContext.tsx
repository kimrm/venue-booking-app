"use client";
import { createContext, useEffect, useMemo, useState } from "react";

export interface UiContextType {
	searchModalOpen: boolean;
	setSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UiContext = createContext<UiContextType | undefined>(undefined);

interface Props {
	children: React.ReactNode;
}

export default function UiContextProvider({ children }: Props) {
	const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
	const contextValue: UiContextType = useMemo(() => {
		return { searchModalOpen, setSearchModalOpen };
	}, [searchModalOpen, setSearchModalOpen]);

	return (
		<UiContext.Provider value={contextValue}>{children}</UiContext.Provider>
	);
}
