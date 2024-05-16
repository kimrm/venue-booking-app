"use client";

import { create } from "@/actions/venues";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormStatus, useFormState } from "react-dom";
import VenueRegisterData from "@/types/VenueRegisterData";
import Information from "./information";
import AddImages from "./addImages";
import Location from "./location";
import {
	CancelButton,
	ConfirmButton,
	SubmitButton,
	ActionButton,
	ButtonSvg,
} from "@/components/UI/buttons";

const initialState = {
	status: "",
	data: {},
};

export default function RegisterVenue() {
	const [formOpen, setFormOpen] = useState(false);
	const { pending } = useFormStatus();
	const [state, formAction] = useFormState(create, initialState);
	const [registerData, setRegisterData] = useState<
		VenueRegisterData | undefined
	>();
	const [tab, setTab] = useState(0);
	const [errors, setErrors] = useState({});
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		if (registerData) {
			console.log(registerData);
		}
	}, [registerData]);

	useEffect(() => {
		if (formOpen) {
			document.body.classList.add("noscroll");
		}
		return () => {
			document.body.classList.remove("noscroll");
		};
	}, [formOpen]);

	useEffect(() => {
		console.log(state);
		if (state?.status === "ok") {
			setIsSuccess(true);
			setRegisterData({});
		}
		state?.errors && setErrors(state.errors);
	}, [state]);

	return (
		<div className="my-5">
			<ActionButton onClick={() => setFormOpen(true)}>
				<ButtonSvg>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 4.5v15m7.5-7.5h-15"
					/>
				</ButtonSvg>
				Add venue
			</ActionButton>

			{formOpen && (
				<div className="fixed left-0 top-0 z-20 flex h-screen w-screen items-center bg-black bg-opacity-80 px-2 py-5">
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						className="relative mx-auto my-5 h-full w-full max-w-screen-md overflow-y-scroll rounded-3xl bg-offwhite px-6 py-8 shadow-lg"
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
						{isSuccess && (
							<div className="my-3 border-l-8 border-green-700 bg-green-100 p-4">
								<h1 className="text-xs font-bold uppercase tracking-wider">
									Venue Registered
								</h1>
								<p className="my-2">
									Your venue has been successfully registered!
								</p>
								<ConfirmButton onClick={() => setFormOpen(false)}>
									Close
								</ConfirmButton>
							</div>
						)}
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
										errors={errors}
									/>
								)}
								{tab === 1 && (
									<Location
										registerData={registerData}
										setRegisterData={setRegisterData}
									/>
								)}
								{tab === 2 && (
									<AddImages
										registerData={registerData}
										setRegisterData={setRegisterData}
									/>
								)}

								<div className="flex justify-end p-4">
									{tab === 1 && (
										<button className="rounded-xl bg-yellow-400 px-4 py-2">
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
													d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
												/>
											</svg>
										</button>
									)}
								</div>
							</div>
						</div>
						<form action={formAction}>
							<input
								type="hidden"
								id="name"
								name="name"
								value={registerData?.name ?? ""}
							/>
							<input
								type="hidden"
								id="description"
								name="description"
								value={registerData?.description ?? ""}
							/>
							<input
								type="hidden"
								id="price"
								name="price"
								value={registerData?.price ?? ""}
							/>
							<input
								type="hidden"
								id="maxGuests"
								name="maxGuests"
								value={registerData?.maxGuests ?? ""}
							/>
							{registerData?.media &&
								registerData.media.map((image, index) => (
									<input
										key={index}
										type="hidden"
										id={`media${index + 1}`}
										name="media"
										value={JSON.stringify(image)}
									/>
								))}
							<input
								type="hidden"
								id="wifi"
								name="wifi"
								value={registerData?.wifi ? "1" : "0"}
							/>
							<input
								type="hidden"
								id="parking"
								name="parking"
								value={registerData?.parking ? "1" : "0"}
							/>
							<input
								type="hidden"
								id="pets"
								name="pets"
								value={registerData?.pets ? "1" : "0"}
							/>
							<input
								type="hidden"
								id="breakfast"
								name="breakfast"
								value={registerData?.breakfast ? "1" : "0"}
							/>
							<input
								type="hidden"
								id="address"
								name="address"
								value={registerData?.address ?? ""}
							/>
							<input
								type="hidden"
								id="city"
								name="city"
								value={registerData?.city ?? ""}
							/>
							<input
								type="hidden"
								id="zip"
								name="zip"
								value={registerData?.zip ?? ""}
							/>
							<input
								type="hidden"
								id="country"
								name="country"
								value={registerData?.country ?? ""}
							/>
							<input
								type="hidden"
								id="continent"
								name="continent"
								value={registerData?.continent ?? ""}
							/>
							<input
								type="hidden"
								id="lat"
								name="lat"
								value={registerData?.lat ?? ""}
							/>
							<input
								type="hidden"
								id="lng"
								name="lng"
								value={registerData?.lng ?? ""}
							/>

							<div className="mt-5 flex gap-5">
								<SubmitButton>Save Venue</SubmitButton>
								<CancelButton onClick={() => setFormOpen(false)}>
									Cancel
								</CancelButton>
							</div>
						</form>
					</motion.div>
				</div>
			)}
		</div>
	);
}
