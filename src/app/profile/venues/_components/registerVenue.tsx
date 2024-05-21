"use client";

import { create } from "@/actions/venues";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import VenueRegisterData from "@/types/VenueRegisterData";
import Information from "./information";
import AddImages from "./addImages";
import Location from "./location";
import { SubmitButton } from "@/components/UI/buttons";

const initialState = {
	status: "",
	data: {},
};

export default function RegisterVenue() {
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
		console.log(state);
		if (state?.status === "ok") {
			setIsSuccess(true);
			setRegisterData({});
		}
		state?.errors && setErrors(state.errors);
	}, [state]);

	return (
		<div className="my-5">
			<div className="my-5 h-full w-full rounded bg-offwhite">
				<h2 className="font-serif text-lg font-bold md:text-2xl">
					Register your venue
				</h2>
				<p className="my-5 max-w-prose">
					Renting out your venue on Holidation is easy. Just register and people
					from around the world can book it.
				</p>
				{isSuccess && (
					<div className="my-3 border-l-8 border-green-700 bg-green-100 p-4">
						<h1 className="text-xs font-bold uppercase tracking-wider">
							Venue Registered
						</h1>
						<p className="my-2">Your venue has been successfully registered!</p>
					</div>
				)}
				<div className="rounded bg-gray-50">
					<div className="flex gap-3 text-sm md:text-base">
						<button
							onClick={() => setTab(0)}
							className={` ${tab === 0 ? "rounded-xl bg-yellow-200 font-bold text-gray-900" : " rounded-xl border border-yellow-200  text-gray-500 hover:border-gray-300 hover:bg-yellow-100 hover:text-gray-800"} px-4 py-2`}
						>
							Information
						</button>
						<button
							onClick={() => setTab(1)}
							className={` ${tab === 1 ? "rounded-xl bg-yellow-200 font-bold text-gray-900" : " rounded-xl border border-yellow-200  text-gray-500 hover:border-gray-300 hover:bg-yellow-100 hover:text-gray-800"} px-4 py-2`}
						>
							Location
						</button>
						<button
							onClick={() => setTab(2)}
							className={` ${tab === 2 ? "rounded-xl bg-yellow-200 font-bold text-gray-900" : " rounded-xl border border-yellow-200  text-gray-500 hover:border-gray-300 hover:bg-yellow-100 hover:text-gray-800"} px-4 py-2`}
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

					<div className="mt-5">
						<SubmitButton>Save Venues</SubmitButton>
					</div>
				</form>
			</div>
		</div>
	);
}
