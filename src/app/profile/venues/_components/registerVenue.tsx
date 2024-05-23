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
	const [errors, setErrors] = useState<any | undefined>(undefined);

	useEffect(() => {
		if (state?.status === "ok") {
			const id = state.data.id;
			if (window) {
				window.location.href = `/profile/venues/${id}`;
			}
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
					Listing your venue on Holidation is easy. Just register, and people
					from around the world can book it.
				</p>
				{errors && (
					<div className="my-3 border-l-8 border-red-600 bg-red-100 p-4 text-red-500">
						You have errors in your form. Please check all fields for errors.
					</div>
				)}
				<div className="rounded bg-gray-50">
					<form action={formAction}>
						<Information
							registerData={registerData}
							setRegisterData={setRegisterData}
							errors={errors}
						/>
						<AddImages
							registerData={registerData}
							setRegisterData={setRegisterData}
						/>
						<Location
							registerData={registerData}
							setRegisterData={setRegisterData}
						/>

						<div className="mt-5">
							<SubmitButton>Save Venues</SubmitButton>
						</div>
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
						{errors && (
							<div className="my-3 border-l-8 border-red-600 bg-red-100 p-4 text-red-500">
								You have errors in your form. Please check all fields for
								errors.
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
