"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Input, CheckBox } from "@/components/form";
import { useRouter } from "next/navigation";
import { ActionButton, CancelButton } from "@/components/UI/buttons";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_KEY;

export default function SearchModal({
	setFilters,
	close,
}: {
	setFilters: Function;
	close: () => void;
}) {
	const searchInput = useRef<HTMLInputElement>(null);
	const [localFilters, setLocalFilters] = useState({
		lat: 0,
		lng: 0,
		search: "",
		city: "",
		country: "",
		continent: "",
		minGuests: 1,
		maxPrice: 9999,
		wifi: "",
		parking: "",
		breakfast: "",
		pets: "",
	});
	const router = useRouter();
	const [userLocation, setUserLocation] = useState<any | null>(null);
	const [locationLoading, setLocationLoading] = useState(false);
	const [userLocationFilter, setUserLocationFilter] = useState(false);
	const [nearLocation, setNearLocation] = useState("");

	useEffect(() => {
		if (userLocationFilter) {
			setLocalFilters((prev) => {
				return {
					...prev,
					lat: userLocation.latitude,
					lng: userLocation.longitude,
				};
			});
		} else {
			setLocalFilters((prev) => {
				return {
					...prev,
					lat: 0,
					lng: 0,
				};
			});
		}
	}, [userLocationFilter, userLocation]);

	function updateFilters() {
		setFilters((prev: any) => {
			return { ...prev, ...localFilters };
		});
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setLocalFilters((prev) => {
			return { ...prev, [name]: value };
		});
	}

	const getUserLocation = () => {
		if (navigator.geolocation) {
			setLocationLoading(true);
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;

					setUserLocation({ latitude, longitude });
				},
				(error) => {
					console.error("Error getting user location:", error);
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 60000,
				}
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	};

	useEffect(() => {
		if (userLocation) {
			const fetchLocationInfo = async (latitude: number, longitude: number) => {
				const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`;
				try {
					const response = await fetch(url);
					const data = await response.json();
					const features = data.features;
					const addressFeature = features.find((feature: any) =>
						feature.place_type.includes("address")
					);

					setNearLocation(addressFeature ? addressFeature.text : "");
				} catch (error) {
					console.error("Error fetching location info:", error);
				}
			};
			fetchLocationInfo(userLocation.latitude, userLocation.longitude);
			setLocationLoading(false);
			setUserLocationFilter(true);
		}
		console.log("User location updated:", userLocation);
	}, [userLocation]);

	useEffect(() => {
		console.log("Local filters updated:", localFilters);
	}, [localFilters]);

	useEffect(() => {
		searchInput.current?.focus();
	}, []);

	return (
		<div className="fixed left-0 top-0 z-50 flex h-full max-h-screen w-screen justify-center overflow-scroll bg-black bg-opacity-20 pb-20">
			<motion.div
				initial={{ opacity: 0, scale: 0.5, y: -200 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				className="mx-auto mt-5 h-fit w-full max-w-screen-md overflow-scroll rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-lg"
			>
				<h2 className="font-serif text-2xl font-bold">
					Find your next holiday
				</h2>
				<section id="searchForm" className="mt-4">
					<form>
						<Input
							ref={searchInput}
							onChange={handleChange}
							onBlur={updateFilters}
							name="search"
							id="search"
							type="text"
							title="Search for title, id or keywords"
						></Input>
						<h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide">
							Location
						</h3>
						<div className="my-5">
							{!userLocation && (
								<ActionButton
									disabled={locationLoading}
									type="button"
									onClick={getUserLocation}
								>
									{locationLoading
										? "Finding location..."
										: "Find venues near me"}
								</ActionButton>
							)}

							{!locationLoading && userLocation && (
								<div className="flex w-fit items-center gap-2 rounded bg-yellow-500 px-4 py-2 ">
									<label
										htmlFor="useLocation"
										className="inline text-xs uppercase tracking-wide"
									>
										Near {nearLocation}
									</label>
									<input
										type="checkbox"
										name="useLocation"
										id="useLocation"
										value="1"
										checked={userLocationFilter}
										onChange={() => setUserLocationFilter(!userLocationFilter)}
										onBlur={updateFilters}
									/>
								</div>
							)}
						</div>

						<div className="flex flex-wrap gap-2">
							<Input name="city" type="text" id="city" title="City" />
							<Input name="country" type="text" id="country" title="Country" />
							<Input
								name="continent"
								type="text"
								id="continent"
								title="Continent"
							/>
						</div>
						<h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide">
							Properties
						</h3>
						<div className="flex gap-2">
							<Input type="number" id="minGuests" title="Min. guests"></Input>
							<Input type="number" id="maxPrice" title="Max. price"></Input>
						</div>
						<h3 className="mb-2 mt-4 text-xs font-bold uppercase tracking-wide">
							Accommodations
						</h3>
						<div className="flex gap-5">
							<CheckBox
								name="wifi"
								id="wifi"
								title="Wifi"
								value="1"
								onChange={handleChange}
								onBlur={updateFilters}
							/>
							<CheckBox
								name="parking"
								id="parking"
								title="Parking"
								value="1"
								onChange={handleChange}
								onBlur={updateFilters}
							/>
							<CheckBox
								name="pets"
								id="pets"
								title="Pets"
								value="1"
								onChange={handleChange}
								onBlur={updateFilters}
							/>
							<CheckBox
								name="breakfast"
								id="breakfast"
								title="Breakfast"
								value="1"
								onChange={handleChange}
								onBlur={updateFilters}
							/>
						</div>
					</form>
					<div className="mt-10 flex gap-2">
						<ActionButton onClick={close}>Show results</ActionButton>
						<CancelButton onClick={() => router.back()}>Cancel</CancelButton>
					</div>
				</section>
			</motion.div>
		</div>
	);
}
