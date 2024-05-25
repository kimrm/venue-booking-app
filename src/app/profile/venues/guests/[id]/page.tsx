import React from "react";
import { getBookingById } from "@/actions/bookings";

export default async function GuestDetails({
	params,
}: {
	params: { id: string };
}) {
	const booking = await getBookingById(params.id);
	return (
		<div>
			<h1 className="mb-5 font-serif text-2xl font-bold capitalize">
				{booking.venue?.name}
			</h1>

			<h2 className="mb-2 pb-2 text-xs font-bold uppercase text-gray-700">
				Guests details
			</h2>
			<div className="grid grid-cols-2">
				<div className="bg-yellow-50 p-2">Customer:</div>
				<div className="bg-yellow-50 p-2">{booking.customer?.name}</div>

				<div className="p-2">Check-in:</div>
				<div className="p-2">
					{new Date(booking.dateFrom).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
				<div className="bg-yellow-50 p-2">Check-out</div>
				<div className="bg-yellow-50 p-2">
					{new Date(booking.dateTo).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
				<div className="p-2">Guests</div>
				<div className="p-2">{booking.guests}</div>
				<div className="bg-yellow-50 p-2">Booking date</div>
				<div className="bg-yellow-50 p-2">
					{new Date(booking.created).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
				<div className="p-2">Contact guest:</div>
				<div className="p-2">
					<a href={`mailto:${booking.customer?.email}`}>
						{booking.customer?.email}
					</a>
				</div>
			</div>
		</div>
	);
}
