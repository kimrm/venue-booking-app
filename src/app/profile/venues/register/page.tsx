import React from "react";
import RegisterVenue from "../_components/registerVenue";
import { getProfile } from "@/actions/profile";
import UserProfile from "@/types/UserProfile";

export default async function VenueManagerRegister() {
	const profile: UserProfile = await getProfile();
	return (
		<div>
			{profile.venueManager ? (
				<RegisterVenue />
			) : (
				<span className="text-red-500">
					You are not registered as a venue mananger!
				</span>
			)}
		</div>
	);
}
