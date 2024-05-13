import React from "react";
import RegisterVenue from "./_components/registerVenue";
import { getVenuesForProfile } from "@/actions/venues";
import Venue from "@/types/Venue";
import Link from "next/link";

export default async function page() {
	const venues: Venue[] = await getVenuesForProfile();
	return (
		<>
			<div>
				<h2 className="text-xl font-bold uppercase">Venues</h2>
				<p className="mt-3">Manage your home or venues for rent.</p>
				<RegisterVenue />
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
