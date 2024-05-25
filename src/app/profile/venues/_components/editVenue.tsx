"use client";

import { update, destroy } from "@/actions/venues";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import VenueRegisterData from "@/types/VenueRegisterData";
import Information from "./information";
import AddImages from "./addImages";
import Location from "./location";
import { SubmitButton } from "@/components/UI/buttons";
import Venue from "@/types/Venue";
import { Modal, ModalHeader, ModalBody } from "@/components/modal";

const initialState = {
	status: "",
	data: {},
};

interface EditVenueProps {
	venue: Venue;
}

export default function EditVenue({ venue }: EditVenueProps) {
	const [state, formAction] = useFormState(update, initialState);
	const [registerData, setRegisterData] = useState<
		VenueRegisterData | undefined
	>({
		name: venue.name,
		description: venue.description,
		price: venue.price,
		maxGuests: venue.maxGuests,
		media: venue.media,
		wifi: venue.meta.wifi,
		parking: venue.meta.parking,
		pets: venue.meta.pets,
		breakfast: venue.meta.breakfast,
		address: venue.location.address,
		city: venue.location.city,
		zip: venue.location.zip,
		country: venue.location.country,
		continent: venue.location.continent,
		lat: venue.location.lat,
		lng: venue.location.lng,
	});
	const [errors, setErrors] = useState<any | undefined>(undefined);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		state?.errors && setErrors(state.errors);
	}, [state]);

	async function handleDelete() {
		if (venue.id) {
			const res = await destroy(venue.id);
			if (res.status === "ok") {
				if (window) {
					window.location.href = `/profile/venues?toast=delete-venue-successful`;
				}
			}
		}
	}

	function handleConfirm() {
		handleDelete();
	}

	function handleCancel() {
		setShowModal(false);
	}

	return (
		<div className="my-5">
			{showModal && (
				<Modal onConfirm={handleConfirm} onCancel={handleCancel}>
					<ModalHeader>Delete this venue?</ModalHeader>
					<ModalBody>
						<p>If you delete this venue there&apos;s no going back.</p>
					</ModalBody>
				</Modal>
			)}

			<div className="my-5 h-full w-full rounded bg-offwhite">
				<h2 className="mb-5 font-serif text-lg font-bold md:text-2xl">
					Edit venue
				</h2>

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
						<input type="hidden" name="id" value={venue.id} />
						<div className="mt-5 flex justify-between">
							<SubmitButton>Save Venues</SubmitButton>
							<button
								type="button"
								onClick={() => setShowModal(true)}
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
						{state.status === "ok" && (
							<div className="my-3 border-l-8 border-green-600 bg-green-100 p-4 text-green-500">
								Venue updated successfully
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
