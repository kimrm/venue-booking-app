import VenueRegisterData from "@/types/VenueRegisterData";
import { Input, TextArea, CheckBox } from "@/components/form";
import { ChangeEvent } from "react";

export default function Information({
	registerData,
	setRegisterData,
	errors,
}: {
	registerData?: VenueRegisterData;
	setRegisterData: Function;
	errors: any;
}) {
	return (
		<>
			<h2 className="my-3 text-sm font-bold uppercase text-gray-800">
				Details
			</h2>
			<Input
				title="Name"
				type="text"
				id="name"
				name="name"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						name: e.target.value,
					}))
				}
				value={registerData?.name ?? ""}
			>
				{errors && <p className="mb-3 text-sm text-red-500">{errors.name}</p>}
			</Input>
			<TextArea
				title="Description"
				id="description"
				name="description"
				rows={3}
				onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						description: e.target.value,
					}))
				}
				value={registerData?.description ?? ""}
			>
				{errors && (
					<p className="mb-3 text-sm text-red-500">{errors.description}</p>
				)}
			</TextArea>
			<h2 className="my-3 text-sm font-bold uppercase text-gray-800">
				Conditions
			</h2>
			<Input
				title="Price per night"
				type="number"
				id="price"
				name="price"
				placeholder="100"
				max="10000"
				min="0"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						price: parseInt(e.target.value),
					}))
				}
				value={registerData?.price ?? ""}
			>
				{errors && <p className="mb-3 text-sm text-red-500">{errors.price}</p>}
			</Input>
			<Input
				title="Max guests"
				type="number"
				id="maxGuests"
				name="maxGuests"
				placeholder="2"
				min="1"
				max="100"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setRegisterData((prev: VenueRegisterData) => ({
						...prev,
						maxGuests: parseInt(e.target.value),
					}))
				}
				value={registerData?.maxGuests ?? ""}
			>
				{errors && (
					<p className="mb-3 text-sm text-red-500">{errors.maxGuests}</p>
				)}
			</Input>
			<div>
				<h2 className="my-3 text-sm font-bold uppercase text-gray-800">
					Accommodations
				</h2>
				<div className="flex flex-wrap gap-5">
					<CheckBox
						title="Wifi"
						id="wifi"
						name="wifi"
						value="1"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: VenueRegisterData) => ({
								...prev,
								wifi: e.target.checked,
							}))
						}
						checked={registerData?.wifi ?? false}
					/>
					<CheckBox
						title="Parking"
						id="parking"
						name="parking"
						value="1"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: VenueRegisterData) => ({
								...prev,
								parking: e.target.checked,
							}))
						}
						checked={registerData?.parking ?? false}
					/>
					<CheckBox
						title="Pets"
						id="pets"
						name="pets"
						value="1"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: VenueRegisterData) => ({
								...prev,
								pets: e.target.checked,
							}))
						}
						checked={registerData?.pets ?? false}
					/>
					<CheckBox
						title="Breakfast"
						id="breakfast"
						name="breakfast"
						value="1"
						onChange={(e: ChangeEvent<HTMLInputElement>) =>
							setRegisterData((prev: VenueRegisterData) => ({
								...prev,
								breakfast: e.target.checked,
							}))
						}
						checked={registerData?.breakfast ?? false}
					/>
				</div>
			</div>
		</>
	);
}
