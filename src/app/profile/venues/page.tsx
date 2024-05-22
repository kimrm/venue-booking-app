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
			<div>
				<h2 className="text-xl font-bold uppercase">Venues</h2>
				<p className="my-3">Manage your home or venues for rent.</p>
				<div className="mb-3">
					<LinkButton href="/profile/venues/register">
						Register a venue
					</LinkButton>
				</div>
			</div>
			<table className="w-full table-auto">
				<thead className="border-b-2 border-dashed">
					<tr>
						<th className="py-2 text-left">Name</th>
						<th className="text-left">Rating</th>
						<th className="text-left">Bookings</th>
					</tr>
				</thead>
				<tbody>
					{venues.map((venue) => (
						<tr key={venue.id}>
							<td className="py-2 text-left">
								<Link href={`/profile/venues/${venue.id}`}>{venue.name}</Link>
							</td>
							<td>{venue.rating === 0 ?? venue.rating}</td>
							<td>{venue.bookings?.length}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
