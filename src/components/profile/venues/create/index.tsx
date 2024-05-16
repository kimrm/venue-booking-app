"use client";

import { create } from "@/actions/venues";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormStatus, useFormState } from "react-dom";

const initialState = {
	status: "",
	data: {},
};

export default function Create() {
	const [formOpen, setFormOpen] = useState(false);
	const { pending } = useFormStatus();
	const [state, formAction] = useFormState(create, initialState);

	useEffect(() => {
		function updateVH() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}
		window.addEventListener("resize", updateVH);
		return () => window.removeEventListener("resize", updateVH);
	}, []);

	function handleClose() {
		setFormOpen(false);
	}

	function handleOpen() {
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
				<div className="h-screen-vh absolute left-0 top-0 z-50 flex w-screen items-center bg-black bg-opacity-80 p-2">
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						className="mx-auto h-full w-full rounded-3xl bg-offwhite px-6 py-4"
					>
						<h2 className="text-xl font-bold">Add venue</h2>
						<p className="my-3 max-w-prose">List your home or venue.</p>
						<form action={formAction} className="flex flex-col gap-3">
							<div className="flex flex-col gap-1">
								<label htmlFor="name">Name</label>
								<input
									className="rounded border"
									type="text"
									id="name"
									name="name"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="description">Description</label>
								<textarea
									className="rounded border"
									id="description"
									name="description"
									rows={5}
								></textarea>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="price">Price</label>
								<input
									className="rounded border"
									type="text"
									id="price"
									name="price"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="maxGuests">Max guests</label>
								<input
									className="rounded border"
									type="text"
									id="maxGuests"
									name="maxGuests"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<label htmlFor="media1">Image 1</label>
								<input
									className="rounded border"
									type="url"
									id="media1"
									name="media"
								/>
								<label htmlFor="media2">Image 2</label>
								<input
									className="rounded border"
									type="url"
									id="media2"
									name="media"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<span>Accommodations</span>
								<div>
									<input
										type="checkbox"
										name="wifi"
										id="wifi"
										content="Wifi"
										value="on"
									/>
									<label htmlFor="wifi">Wifi</label>
									<input
										type="checkbox"
										name="parking"
										id="parking"
										content="Parking"
										value="on"
									/>
									<label htmlFor="parking">Parking</label>
									<input
										type="checkbox"
										name="pets"
										id="pets"
										content="Pets"
										value="on"
									/>
									<label htmlFor="pets">Pets</label>
									<input
										type="checkbox"
										name="breakfast"
										id="breakfast"
										content="Breakfast"
										value="on"
									/>
									<label htmlFor="breakfast">Breakfast</label>
								</div>
							</div>
							<div className="flex flex-col gap-1">
								<span>Location</span>
								<button>Get location from map</button>
								<div>
									<label htmlFor="address">Address</label>
									<input type="text" name="address" id="address" />
									<label htmlFor="city">City</label>
									<input type="text" name="city" id="city" />
									<label htmlFor="zip">Zip</label>
									<input type="text" name="zip" id="zip" />
									<label htmlFor="country">Country</label>
									<input type="text" name="country" id="country" />
									<label htmlFor="continent">Continent</label>
									<input type="text" name="continent" id="continent" />
									<label htmlFor="lat">Latitude</label>
									<input type="text" name="lat" id="lat" />
									<label htmlFor="lng">Longitude</label>
									<input type="text" name="lng" id="lng" />
								</div>
							</div>
							<button type="submit">{pending ? "waiting..." : "Save"}</button>
							<button onClick={handleClose}>Cancel</button>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
}
