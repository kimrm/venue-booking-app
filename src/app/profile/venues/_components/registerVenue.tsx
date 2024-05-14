"use client";

import { create } from "@/actions/venues";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormStatus, useFormState } from "react-dom";
import { Input, TextArea, CheckBox } from "@/components/form";
import MapboxMap from "./mapboxMap";

interface Location {
	latitude: number;
	longitude: number;
}

const initialState = {
	status: "",
	data: {},
};

interface RegisterData {
	name?: string;
	description?: string;
	price?: number;
	maxGuests?: number;
	media?: string;
	wifi?: boolean;
	parking?: boolean;
	pets?: boolean;
	breakfast?: boolean;
	address?: string;
	city?: string;
	zip?: string;
	country?: string;
	continent?: string;
	lat?: number;
	lng?: number;
}

export default function RegisterVenue() {
	const [formOpen, setFormOpen] = useState(false);
	const { pending } = useFormStatus();
	const [state, formAction] = useFormState(create, initialState);
	const [registerData, setRegisterData] = useState<RegisterData | undefined>();
	const [tab, setTab] = useState(0);

	useEffect(() => {
		if (registerData) {
			console.log(registerData);
		}
	}, [registerData]);

	function handleClose() {
		document.body.classList.remove("noscroll");
		setFormOpen(false);
	}

	function handleOpen() {
		document.body.classList.add("noscroll");
		setFormOpen(true);
	}

	useEffect(() => {
		if (state?.status === "ok") {
			setFormOpen(false);
			console.log(state.data);
		}
	}, [state]);

	return (
		<div className="my-5">
			<button
				onClick={handleOpen}
				className="flex items-center gap-1 rounded-lg bg-yellow-400 p-2 transition-colors duration-300 hover:bg-yellow-500"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="inline h-4 w-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</svg>
				Add venue
			</button>
			{state?.status && <p>{state.status}</p>}
			{formOpen && (
				<div className="absolute left-0 top-0 z-20 flex h-screen w-screen items-center bg-black bg-opacity-80 p-2">
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						className="relative mx-auto h-full w-full max-w-screen-md overflow-y-scroll rounded-3xl bg-offwhite px-6 py-4"
					>
						<button
							onClick={() => setFormOpen(false)}
							className="absolute right-4 top-2 z-30 flex flex-row items-center gap-1 rounded-lg bg-gray-200 p-2 transition-colors duration-300 hover:bg-gray-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="h-8 w-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 18 18 6M6 6l12 12"
								/>
							</svg>
							<span className="hidden md:block">Cancel</span>
						</button>
						<h2 className="font-serif text-lg font-bold md:text-2xl">
							Register your venue
						</h2>
						<p className="my-5 max-w-prose">
							Renting out your venue on Holidation is easy. Just register and
							people from around the world can book it.
						</p>
						<div className="rounded bg-gray-200">
							<div className="flex text-sm md:text-base">
								<button
									onClick={() => setTab(0)}
									className={`rounded-tl ${tab === 0 ? "bg-gray-200 font-bold text-gray-900" : "border bg-gray-100 text-gray-500 hover:border-gray-300 hover:text-gray-800"} px-4 py-2`}
								>
									Information
								</button>
								<button
									onClick={() => setTab(1)}
									className={`rounded-tl ${tab === 1 ? "bg-gray-200 font-bold text-gray-900" : "border bg-gray-100 text-gray-500 hover:border-gray-300 hover:text-gray-800"} px-4 py-2`}
								>
									Location
								</button>
								<button
									onClick={() => setTab(2)}
									className={`rounded-tl ${tab === 2 ? "bg-gray-200 font-bold text-gray-900" : "border bg-gray-100 text-gray-500 hover:border-gray-300 hover:text-gray-800"} px-4 py-2`}
								>
									Images
								</button>
							</div>
							<div className="mt-5 flex flex-col p-2">
								{tab === 0 && (
									<Information
										registerData={registerData}
										setRegisterData={setRegisterData}
									/>
								)}
								{tab === 1 && (
									<Location
										registerData={registerData}
										setRegisterData={setRegisterData}
									/>
								)}
								<div className="flex justify-end p-4">
									<button className="rounded-xl bg-yellow-400 px-4 py-2">
										next
									</button>
								</div>
							</div>
						</div>
						<form action={formAction}>
							<input type="hidden" id="name" name="name" />
							<input type="hidden" id="description" name="description" />
							<input type="hidden" id="price" name="price" />
							<input type="hidden" id="maxGuests" name="maxGuests" />
							<input type="hidden" id="media1" name="media" />
							<input type="hidden" id="wifi" name="wifi" />
							<input type="hidden" id="parking" name="parking" />
							<input type="hidden" id="pets" name="pets" />
							<input type="hidden" id="breakfast" name="breakfast" />
							<input type="hidden" id="address" name="address" />
							<input type="hidden" id="city" name="city" />
							<input type="hidden" id="zip" name="zip" />
							<input type="hidden" id="country" name="country" />
							<input type="hidden" id="continent" name="continent" />
							<input type="hidden" id="lat" name="lat" />
							<input type="hidden" id="lng" name="lng" />

							<div className="mt-5 flex gap-5">
								<button
									type="submit"
									className="rounded-lg bg-yellow-500 px-4 py-2 transition-colors duration-300 hover:bg-yellow-300"
								>
									{pending ? "waiting..." : "Save venue"}
								</button>
								<button
									className="rounded-lg bg-gray-200 px-4 py-2 transition-colors duration-300 hover:bg-gray-300"
									onClick={handleClose}
								>
									Cancel
								</button>
							</div>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
}

function Location({
	registerData,
	setRegisterData,
}: {
	registerData?: RegisterData;
	setRegisterData: Function;
}) {
	const [location, setLocation] = useState<Location>({
		latitude: 0,
		longitude: 0,
	});

	useEffect(() => {
		setRegisterData((prev: RegisterData) => ({
			...prev,
			lat: location.latitude,
			lng: location.longitude,
		}));
	}, [location, setRegisterData]);
	return (
		<>
			<MapboxMap setLocation={setLocation} />
			<Input
				title="Address"
				type="text"
				id="address"
				name="address"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						address: e.target.value,
					}))
				}
				value={registerData?.address}
			/>
			<div className="flex gap-5">
				<Input
					title="Zip"
					type="number"
					id="zip"
					name="zip"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setRegisterData((prev: RegisterData) => ({
							...prev,
							zip: e.target.value,
						}))
					}
					value={registerData?.zip}
				/>
				<Input
					title="City"
					type="text"
					id="city"
					name="city"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setRegisterData((prev: RegisterData) => ({
							...prev,
							city: e.target.value,
						}))
					}
					value={registerData?.city}
				/>
			</div>

			<Input
				title="Country"
				type="text"
				id="country"
				name="country"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						country: e.target.value,
					}))
				}
				value={registerData?.country}
			/>
			<Input
				title="Continent"
				type="text"
				id="continent"
				name="continent"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						continent: e.target.value,
					}))
				}
				value={registerData?.continent}
			/>
			<Input
				title="Latitude"
				type="number"
				id="lat"
				name="lat"
				min="-90"
				max="90"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						lat: parseInt(e.target.value),
					}))
				}
				value={registerData?.lat}
			/>
			<Input
				title="Longitude"
				type="number"
				id="lng"
				name="lng"
				min="-180"
				max="180"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						lng: parseInt(e.target.value),
					}))
				}
				value={registerData?.lng}
			/>
		</>
	);
}

function Information({
	registerData,
	setRegisterData,
}: {
	registerData?: RegisterData;
	setRegisterData: Function;
}) {
	return (
		<>
			<Input
				title="Name"
				type="text"
				id="name"
				name="name"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						name: e.target.value,
					}))
				}
				value={registerData?.name}
			/>
			<TextArea
				title="Description"
				id="description"
				name="description"
				rows={3}
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						description: e.target.value,
					}))
				}
				value={registerData?.description}
			/>
			<Input
				title="Price per night"
				type="number"
				id="price"
				name="price"
				placeholder="100"
				max="10000"
				min="0"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						price: parseInt(e.target.value),
					}))
				}
				value={registerData?.price}
			/>
			<Input
				title="Max guests"
				type="number"
				id="maxGuests"
				name="maxGuests"
				placeholder="2"
				min="1"
				max="100"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: RegisterData) => ({
						...prev,
						maxGuests: parseInt(e.target.value),
					}))
				}
				value={registerData?.maxGuests}
			/>
			<div>
				<h2 className="my-3 text-sm font-bold uppercase text-gray-800">
					Accommodations
				</h2>
				<div className="flex gap-5">
					<CheckBox
						title="Wifi"
						id="wifi"
						name="wifi"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: RegisterData) => ({
								...prev,
								wifi: e.target.checked,
							}))
						}
						checked={registerData?.wifi}
					/>
					<CheckBox
						title="Parking"
						id="parking"
						name="parking"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: RegisterData) => ({
								...prev,
								parking: e.target.checked,
							}))
						}
						checked={registerData?.parking}
					/>
					<CheckBox
						title="Pets"
						id="pets"
						name="pets"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: RegisterData) => ({
								...prev,
								pets: e.target.checked,
							}))
						}
						checked={registerData?.pets}
					/>
					<CheckBox
						title="Breakfast"
						id="breakfast"
						name="breakfast"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: RegisterData) => ({
								...prev,
								breakfast: e.target.checked,
							}))
						}
						checked={registerData?.breakfast}
					/>
				</div>
			</div>
		</>
	);
}
