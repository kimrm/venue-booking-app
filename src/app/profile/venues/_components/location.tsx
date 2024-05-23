import VenueRegisterData from "@/types/VenueRegisterData";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/form/input";
import MapboxMap from "./mapboxMap";
import { getContinentByCountry } from "@/utils/locale";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_KEY;

interface LatLng {
	latitude: number;
	longitude: number;
}

export default function Location({
	registerData,
	setRegisterData,
}: {
	registerData?: VenueRegisterData;
	setRegisterData: Function;
}) {
	const [location, setLocation] = useState<LatLng>({
		latitude: registerData?.lat || 0,
		longitude: registerData?.lng || 0,
	});

	useEffect(() => {
		const fetchLocationInfo = async (latitude: number, longitude: number) => {
			const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`;
			try {
				const response = await fetch(url);
				const data = await response.json();
				const features = data.features;
				const country = features.find((feature: any) =>
					feature.place_type.includes("country")
				);
				const address = features.find((feature: any) =>
					feature.place_type.includes("address")
				);
				const city = features.find((feature: any) =>
					feature.place_type.includes("place")
				);
				const zip = features.find((feature: any) =>
					feature.place_type.includes("postcode")
				);

				setRegisterData((prev: VenueRegisterData) => ({
					...prev,
					address: address ? address.text : "",
					country: country ? country.text : "",
					continent: getContinentByCountry(country?.text ?? "") ?? "",
					city: city ? city.text : "",
					zip: zip ? zip.text : "",
				}));
			} catch (error) {
				console.error("Error fetching location info:", error);
			}
		};

		fetchLocationInfo(location.latitude, location.longitude);

		setRegisterData((prev: VenueRegisterData) => ({
			...prev,
			lat: location.latitude,
			lng: location.longitude,
		}));
	}, [location, setRegisterData]);

	return (
		<>
			<h2 className="my-3 text-sm font-bold uppercase text-gray-800">
				Location
			</h2>
			<p className="mb-3 flex items-start gap-2 text-green-800">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
					/>
				</svg>
				You can set the location from pinning the map.
			</p>

			<div className="mb-3 h-96 w-full overflow-hidden rounded">
				<MapboxMap location={location} setLocation={setLocation} />
			</div>

			<Input
				title="Address"
				type="text"
				id="address"
				name="address"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						address: e.target.value,
					}))
				}
				value={registerData?.address || ""}
			/>
			<div className="flex gap-5">
				<Input
					title="Zip"
					type="text"
					id="zip"
					name="zip"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setRegisterData((prev: VenueRegisterData) => ({
							...prev,
							zip: e.target.value,
						}))
					}
					value={registerData?.zip || ""}
				/>
				<Input
					title="City"
					type="text"
					id="city"
					name="city"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setRegisterData((prev: VenueRegisterData) => ({
							...prev,
							city: e.target.value,
						}))
					}
					value={registerData?.city || ""}
				/>
			</div>

			<Input
				title="Country"
				type="text"
				id="country"
				name="country"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						country: e.target.value,
					}))
				}
				value={registerData?.country || ""}
			/>
			<Input
				title="Continent"
				type="text"
				id="continent"
				name="continent"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						continent: e.target.value,
					}))
				}
				value={registerData?.continent || ""}
			/>

			<input type="hidden" name="lat" value={registerData?.lat || 0} />
			<input type="hidden" name="lng" value={registerData?.lng || 0} />
		</>
	);
}
