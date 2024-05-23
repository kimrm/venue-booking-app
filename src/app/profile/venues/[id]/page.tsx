import React from "react";
import { getById } from "@/actions/venues";
import EditVenue from "../_components/editVenue";
import VenueUrlPreview from "@/components/profile/venues/venueUrlPreview";
import { cookies } from "next/headers";
import { LinkButton } from "@/components/UI/buttons";

async function getVenue(id: string) {
	const venue = await getById(id);
	const loggedInUserName = cookies().get("username")?.value;
	if (loggedInUserName !== venue?.owner.name) {
		throw new Error("Venue not found.");
	}
	return venue;
}

export default async function page({ params }: { params: { id: string } }) {
	const venue = await getVenue(params.id);

	return (
		<div>
			<h1 className="mb-2 text-3xl font-bold">{venue?.name}</h1>
			<div>
				<span className="text-sm uppercase tracking-wide text-gray-700">
					ID: <span className="lowercase">{venue?.id}</span>
				</span>
			</div>
			<VenueUrlPreview venue={venue} />
			<div className="my-5 flex items-center gap-10">
				<div>
					<span className="text-sm uppercase tracking-wide">
						Upcoming bookings:{" "}
					</span>
					{venue?.bookings?.length}
				</div>
				<div>
					<span className="text-sm uppercase tracking-wide">
						Current rating:{" "}
					</span>
					{venue?.rating}
				</div>
			</div>
			<LinkButton href={`/profile/venues/${venue.id}/bookings`}>
				Manage bookings
			</LinkButton>

			<EditVenue venue={venue} />
		</div>
	);
}
