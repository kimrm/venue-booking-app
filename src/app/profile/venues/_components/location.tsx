import VenueRegisterData from "@/types/VenueRegisterData";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/form/input";
import MapboxMap from "./mapboxMap";
import { getContinentByCountry } from "@/utils/locale";

const MAPBOX_TOKEN =
	"pk.eyJ1Ijoia2ltcm1vIiwiYSI6ImNsdzY4eWZzaDI2a2MybHFzb2k2Ym1sb3IifQ.OrBXHf0mXYOFDIWjguTikQ";

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
	const [locationInfo, setLocationInfo] = useState<{
		country: string;
		continent?: string | undefined;
	}>({
		country: "",
		continent: "",
	});

	useEffect(() => {
		console.log("is this running?", location.latitude, location.longitude);

		const fetchLocationInfo = async (latitude: number, longitude: number) => {
			const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`;
			try {
				const response = await fetch(url);
				const data = await response.json();
				const features = data.features;
				const countryFeature = features.find((feature: any) =>
					feature.place_type.includes("country")
				);
				const addressFeature = features.find((feature: any) =>
					feature.place_type.includes("address")
				);
				// console.log("Address feature:", addressFeature);
				// console.log("Country feature:", countryFeature);

				// setLocationInfo({
				// 	country: countryFeature ? countryFeature.text : "Unknown",
				// 	continent: getContinentByCountry(countryFeature.text || "Unknown"),
				// });

				setRegisterData((prev: VenueRegisterData) => ({
					...prev,
					address: addressFeature ? addressFeature.text : "",
					country: countryFeature ? countryFeature.text : "",
					continent: getContinentByCountry(countryFeature?.text ?? "") ?? "",
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

	// useEffect(() => {
	// 	if (locationInfo) {
	// 		setRegisterData((prev: VenueRegisterData) => ({
	// 			...prev,
	// 			country: locationInfo.country,
	// 			continent: locationInfo.continent,
	// 		}));
	// 		console.log("Location info:", locationInfo);
	// 	}
	// }, [locationInfo, setRegisterData]);

	return (
		<>
			<div className="mb-5 h-60 text-sm font-bold uppercase text-gray-800">
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
					type="number"
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
			<Input
				title="Latitude"
				type="number"
				id="lat"
				name="lat"
				min="-90"
				max="90"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						lat: parseInt(e.target.value),
					}))
				}
				value={registerData?.lat || 0}
			/>
			<Input
				title="Longitude"
				type="number"
				id="lng"
				name="lng"
				min="-180"
				max="180"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						lng: parseInt(e.target.value),
					}))
				}
				value={registerData?.lng || 0}
			/>
		</>
	);
}
