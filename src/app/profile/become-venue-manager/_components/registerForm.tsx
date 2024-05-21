"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Toggle from "@/components/form/toggle";
import SubmitButton from "@/app/venues/_components/bookingForm/submitButton";
import { ProfileRequestBody } from "@/types/Request";
import { updateProfile } from "@/actions/profile";
import { LinkButton } from "@/components/UI/buttons";

export default function RegisterForm() {
	const { profile, setProfile } = useContext(UserContext) || {};
	const [venueManager, setVenueManager] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);

	function handleToggleChange(isToggledOn: boolean) {
		setVenueManager(isToggledOn);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const ProfileRequest: ProfileRequestBody = { ...profile, venueManager };
		const updatedProfile = await updateProfile(ProfileRequest);
		if (!updatedProfile.data.venueManager) {
			setErrorMessage("Failed to update profile");
		}
		if (setProfile) {
			setProfile((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					...updatedProfile.data,
				};
			});
		}
		setSuccess(true);
	}

	if (success) {
		return (
			<>
				<h2 className="my-5 text-xl text-yellow-600">
					You&apos;re now ready to start renting your venue.
				</h2>
				<LinkButton href="/profile/venues/">Manage your venues</LinkButton>
			</>
		);
	}
	return (
		<form onSubmit={handleSubmit} className="my-5">
			<p className="mb-3">I want to become a venue manager</p>
			<Toggle onText="Yes" offText="No" onChange={handleToggleChange} />
			<SubmitButton
				disabled={!venueManager}
				pendingText="Saving.."
				defaultText="Save"
			/>
			{errorMessage && <p className="mt-3 text-red-500">{errorMessage}</p>}
		</form>
	);
}
