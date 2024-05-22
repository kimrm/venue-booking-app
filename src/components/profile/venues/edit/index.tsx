"use client";
import Image from "next/image";
import Venue from "@/types/Venue";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { update, destroy } from "@/actions/venues";
import { useFormStatus, useFormState } from "react-dom";
import { Input, TextArea } from "@/components/form";
import { SubmitButton } from "@/components/UI/buttons";
import MapboxMap from "@/app/profile/venues/_components/mapboxMap";
import { getContinentByCountry } from "@/utils/locale";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_KEY;

interface LatLng {
	latitude: number;
	longitude: number;
}

interface Props {
	venue: Venue;
}

const initialState = {
	status: "",
	data: {},
};

export default function Edit({ venue }: Props) {
	const [appendImages, setAppendImages] = useState<
		{ url: string; alt: string }[]
	>([]);
	const [appendImageModalOpen, setAppendImageModalOpen] = useState(false);
	const [newImageUrl, setNewImageUrl] = useState("");
	const [newImageAlt, setNewImageAlt] = useState("");
	const [state, formAction] = useFormState(update, initialState);
	const { pending } = useFormStatus();
	const [toastVisible, setToastVisible] = useState(false);
	const [location, setLocation] = useState<LatLng>({
		latitude: venue.location?.lat ?? 0,
		longitude: venue.location?.lng ?? 0,
	});
	const [countryFromLocation, setCountryFromLocation] = useState("");
	const [addressFromLocation, setAddressFromLocation] = useState("");
	const [cityFromLocation, setCityFromLocation] = useState("");
	const [continentFromLocation, setContinentFromLocation] = useState("");

	useEffect(() => {
		if (location.latitude !== 0 && location.longitude !== 0) {
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

					setCountryFromLocation(country?.text ?? "");
					setAddressFromLocation(address?.text ?? "");
					setCityFromLocation(city?.text ?? "");
					const continent = getContinentByCountry(country?.text ?? "");
					setContinentFromLocation(continent ?? "");
				} catch (error) {
					return undefined;
				}
			};
			fetchLocationInfo(location.latitude, location.longitude);
		}
	}, [location]);

	function handleNewImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewImageUrl(e.target.value);
	}

	function handleNewImageAltChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewImageAlt(e.target.value);
	}

	function handleImageAdd() {
		setAppendImages([...appendImages, { url: newImageUrl, alt: newImageAlt }]);
		setAppendImageModalOpen(false);
		setNewImageUrl("");
		setNewImageAlt("");
	}

	useEffect(() => {
		console.log(pending);
	}, [pending]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (state?.status === "ok") {
			console.log(state.data);
			setToastVisible(true);
			timeout = setTimeout(() => {
				setToastVisible(false);
			}, 5000);
		}
		return () => clearTimeout(timeout);
	}, [state]);

	async function handleDelete() {
		const result = confirm("Are you sure you want to delete this venue?");
		if (result) {
			if (venue.id) {
				const data = await destroy(venue.id);
				if (data.status === "ok") {
					window.location.href = "/profile/venues";
				}
			}
		}
	}

	return (
		<>
			<AnimatePresence>
				{toastVisible && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="fixed right-2 top-2 z-50 border-l-4 border-l-green-500 bg-gray-300 p-2 font-bold text-gray-950"
					>
						Venue updated!
					</motion.div>
				)}
			</AnimatePresence>
			<form action={formAction} className="mt-10">
				{appendImageModalOpen && (
					<div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center bg-black bg-opacity-80 p-2">
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							className="mx-auto rounded-3xl bg-offwhite px-6 py-4"
						>
							<h2 className="text-xl font-bold">Add Image</h2>
							<Input
								type="url"
								title="Image URL"
								placeholder="Image URL"
								value={newImageUrl}
								onChange={handleNewImageChange}
							/>
							<input
								type="text"
								placeholder="Alt text"
								value={newImageAlt}
								onChange={handleNewImageAltChange}
							/>
							<Image
								src={newImageUrl}
								alt={newImageAlt}
								width={100}
								height={100}
							/>
							<button onClick={handleImageAdd}>Add image </button>
						</motion.div>
					</div>
				)}

				<h2 className="mb-5 text-xl font-bold">Edit venue</h2>
				<div className="mb-5">
					<Input
						type="text"
						id="name"
						name="name"
						title="Name"
						defaultValue={venue?.name}
					/>
				</div>
				<div className="mb-5">
					<TextArea
						id="description"
						name="description"
						title="Description"
						defaultValue={venue?.description}
					/>
				</div>
				<div className="mb-5">
					<Input
						type="number"
						id="price"
						name="price"
						title="Price per day"
						className="w-full rounded border border-gray-300 p-2"
						defaultValue={venue?.price}
					/>
				</div>
				<div className="mb-5">
					<Input
						type="number"
						id="maxGuests"
						name="maxGuests"
						title="Max guests"
						defaultValue={venue?.maxGuests}
					/>
				</div>
				<div className="mb-5">
					<span className="block text-sm uppercase tracking-wide">
						Accommodations
					</span>
					<div className="flex gap-5">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="wifi"
								id="wifi"
								content="Wifi"
								defaultChecked={venue?.meta?.wifi}
								value="on"
							/>
							<label htmlFor="wifi">Wifi</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="parking"
								id="parking"
								content="Parking"
								defaultChecked={venue?.meta?.parking}
								value="on"
							/>
							<label htmlFor="parking">Parking</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="pets"
								id="pets"
								content="Pets"
								defaultChecked={venue?.meta?.pets}
								value="on"
							/>
							<label htmlFor="pets">Pets</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="breakfast"
								id="breakfast"
								content="Breakfast"
								defaultChecked={venue?.meta?.breakfast}
								value="on"
							/>
							<label htmlFor="breakfast">Breakfast</label>
						</div>
					</div>
				</div>
				<h2 className="mt-5 text-xl font-bold">Location</h2>

				<div className="my-3 h-96">
					<MapboxMap location={location} setLocation={setLocation} />
				</div>
				<Input
					type="text"
					id="address"
					name="address"
					title="Address"
					defaultValue={
						addressFromLocation ? addressFromLocation : venue?.location?.address
					}
				/>
				<Input
					type="text"
					id="city"
					name="city"
					title="City"
					defaultValue={
						cityFromLocation ? cityFromLocation : venue?.location?.city
					}
				/>
				<Input
					type="text"
					id="country"
					name="country"
					title="Country"
					defaultValue={
						countryFromLocation ? countryFromLocation : venue?.location?.country
					}
				/>
				<Input
					type="text"
					id="continent"
					name="continent"
					title="Continent"
					defaultValue={
						continentFromLocation
							? continentFromLocation
							: venue?.location?.continent
					}
				/>
				<input type="text" name="lat" defaultValue={location.latitude} />
				<input type="text" name="lng" defaultValue={location.longitude} />

				<div className="mb-5">
					<span className="block text-sm uppercase tracking-wide">Images</span>
					<div className="flex flex-wrap gap-5">
						{venue?.media?.map(
							(media: { id?: number; url?: string; alt?: string }) => (
								<Image
									key={media.url}
									src={media.url ?? ""}
									alt={media.alt ?? ""}
									width={100}
									height={100}
									className="h-52 w-52 rounded-lg"
								/>
							)
						)}
						{appendImages.map((image, index) => (
							<Image
								key={index}
								src={image.url}
								alt={image.alt}
								width={100}
								height={100}
								className="rounded-lg"
							/>
						))}

						<div>
							<button
								type="button"
								className="rounded bg-blue-500 px-4 py-2 text-white"
								onClick={() => setAppendImageModalOpen(true)}
							>
								Add image
							</button>
						</div>
					</div>
				</div>
				<div className="flex justify-between">
					<SubmitButton>Save</SubmitButton>
					<button
						type="button"
						onClick={handleDelete}
						title="Delete venue"
						className="flex gap-2 rounded-xl border border-red-200 p-2 text-red-600 hover:bg-red-100"
					>
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
								d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
							/>
						</svg>
						Delete venue
					</button>
				</div>
				<input
					type="hidden"
					name="media"
					value={JSON.stringify(venue?.media?.concat(appendImages))}
				/>
				<input type="hidden" name="id" value={venue?.id} />
			</form>
		</>
	);
}
