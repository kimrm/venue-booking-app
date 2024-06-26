import React from "react";
import { getVenuesForProfile } from "@/actions/venues";
import { getProfile } from "@/actions/profile";
import UserProfile from "@/types/UserProfile";
import Venue from "@/types/Venue";
import Link from "next/link";
import { LinkButton } from "@/components/UI/buttons";

export default async function page() {
	const profile: UserProfile = await getProfile();
	const venues: Venue[] = await getVenuesForProfile();

	if (!profile.venueManager) {
		return (
			<span className="text-red-500">
				You are not registered as a venue mananger!
			</span>
		);
	}
	return (
		<>
			<h2 className="text-xl font-bold uppercase">Venues</h2>
			<p className="my-3">Manage your home or venues for rent.</p>

			<table className="w-full table-auto rounded bg-gray-100">
				<thead className="border-b-2 border-dashed">
					<tr>
						<th className="p-2 text-left">Name</th>
						<th className="text-right">Rating</th>
						<th className="p-2 text-right">Bookings</th>
					</tr>
				</thead>
				<tbody>
					{venues.map((venue, index) => (
						<tr key={venue.id} className={`${index % 2 === 0 && "bg-white"}`}>
							<td className="p-2 text-left">
								<Link href={`/profile/venues/${venue.id}`}>{venue.name}</Link>
							</td>
							<td className="text-right">{venue.rating}</td>
							<td className="p-2 text-right">{venue._count?.bookings}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="mt-5">
				<LinkButton href="/profile/venues/register">
					Register a venue
				</LinkButton>
			</div>
		</>
	);
}
