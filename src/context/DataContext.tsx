"use client";
import { createContext, useEffect, useMemo, useState } from "react";

export interface DataContextType {
	countries: {
		name: string;
		region: string;
	}[];
	regions: {
		subregion: string;
		continents: string;
	}[];
}

export const DataContext = createContext<DataContextType | undefined>(
	undefined
);

interface Props {
	children: React.ReactNode;
}

export default function DataContextProvider({ children }: Props) {
	const [countries, setCountries] = useState<
		{ name: string; region: string }[]
	>([]);
	const [regions, setRegions] = useState<
		{
			subregion: string;
			continents: string;
		}[]
	>([]);
	const contextValue: DataContextType = useMemo(() => {
		return { countries, regions };
	}, [countries, regions]);

	useEffect(() => {
		fetch("/api/data/countries")
			.then((res) => res.json())
			.then((data) => {
				setCountries(
					data.data.map((country: any) => {
						return {
							name: country.name.common,
							region: country.subregion,
						};
					})
				);

				const regionsUsed = new Set();

				const uniqueRegions: {
					subregion: string;
					continents: string;
				}[] = data.data
					.map((country: any) => {
						const continent =
							country.region === "Americas"
								? country.continents[0]
								: country.region;
						if (!regionsUsed.has(country.subregion) && country.subregion) {
							regionsUsed.add(country.subregion);
							return {
								subregion: country.subregion,
								continents: continent,
							};
						}
						return null;
					})
					.filter((region: any) => region !== null);

				setRegions(uniqueRegions);
			})
			.catch((error) => {
				throw new Error(error);
			});
	}, []);

	return (
		<DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
	);
}
