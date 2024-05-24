import React from "react";
import UserProfile from "@/types/UserProfile";
import { getProfile } from "@/actions/profile";
import Link from "next/link";

export default async function Bookings() {
	const profile: UserProfile = await getProfile();
	return (
		<div>
			<section id="bookings" className="my-10">
				<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed border-b-gray-200  pb-2 text-xs font-bold uppercase text-gray-700">
					Bookings
				</h2>
				<div className="my-5">
					<h3 className="mb-1 mt-5 uppercase tracking-widest">
						Upcoming bookings
					</h3>

					<table className="w-full table-auto rounded bg-gray-100">
						<thead className="border-b-2 border-dashed">
							<tr>
								<th className="p-2 text-left">Venue</th>
								<th className="text-left">Check in</th>
								<th className="p-2 text-right">Guests</th>
							</tr>
						</thead>
						<tbody>
							{profile.bookings
								?.filter((booking) => new Date(booking.dateFrom) > new Date())
								.sort(
									(a, b) =>
										new Date(a.dateFrom).getTime() -
										new Date(b.dateFrom).getTime()
								)
								.map((booking) => (
									<tr key={booking.id}>
										<td className="p-2 text-left">
											<Link
												className="hover:text-yellow-600"
												href={`/profile/bookings/${booking.id}`}
											>
												{booking.venue.name}
											</Link>
										</td>
										<td>
											{new Date(booking.dateFrom).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</td>
										<td className="p-2 text-right">{booking.guests}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="mt-10">
					<h3 className="mb-1 mt-5 uppercase">Previous bookings</h3>

					<table className="w-full table-auto rounded bg-gray-100">
						<thead className="border-b-2 border-dashed">
							<tr>
								<th className="p-2 text-left">Venue</th>
								<th className="text-left">Check in</th>
								<th className="text-right">Guests</th>
							</tr>
						</thead>
						<tbody>
							{profile.bookings
								?.filter((booking) => new Date(booking.dateFrom) < new Date())
								.sort(
									(a, b) =>
										new Date(a.dateFrom).getTime() -
										new Date(b.dateFrom).getTime()
								)
								.map((booking) => (
									<tr key={booking.id}>
										<td className="p-2 text-left">
											<Link
												className="hover:text-yellow-600"
												href={`/profile/bookings/${booking.id}`}
											>
												{booking.venue.name}
											</Link>
										</td>
										<td>
											{new Date(booking.dateFrom).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</td>
										<td className="text-right">{booking.guests}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	);
}
