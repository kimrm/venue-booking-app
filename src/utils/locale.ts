import { countries } from "../vars/countries";

export const getContinentByCountry = (country: string) => {
	const countryData = countries.data.find((c) => c.name.common === country);
	return countryData?.continents[0];
};
