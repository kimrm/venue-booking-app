import React from "react";
import { getById } from "@/actions/venues";
import Edit from "@/components/profile/venues/edit";
import VenueUrlPreview from "@/components/profile/venues/venueUrlPreview";

export default async function page({ params }: { params: { id: string } }) {
	const venue = await getById(params.id);

	return (
		<div>
			<h1 className="mb-2 text-3xl font-bold">{venue?.name}</h1>
			<div>
				<span className="text-sm uppercase tracking-wide text-gray-700">
					ID: {venue?.id}
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

			<Edit venue={venue} />
		</div>
	);
}
