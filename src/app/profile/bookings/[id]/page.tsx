import React from "react";
import { getBookingById, getRating } from "@/actions/bookings";
import Image from "next/image";
import Link from "next/link";
import ImageLoader from "@/components/ImageLoader";
import CancelBooking from "./_components/cancelBooking";
import RateBooking from "./_components/rateBooking";

export default async function BookingDetails({
	params,
}: {
	params: { id: string };
}) {
	const booking = await getBookingById(params.id);
	const rating = await getRating(booking?.venue?.id ?? "");

	const isPreviousBooking = new Date(booking.dateTo) < new Date();
	return (
		<div>
			<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed border-b-gray-200  pb-2 text-xs font-bold uppercase text-gray-700">
				Your booking
			</h2>
			<h1 className="mb-3 font-serif text-2xl font-bold capitalize">
				{booking.venue?.name}
			</h1>
			<Link
				className="text-blue-950 hover:text-blue-900 hover:underline"
				href={`/venues/${booking.venue?.id}`}
			>
				View venue page
			</Link>
			<div className="my-5 flex items-center gap-3 rounded bg-gray-100 p-4">
				{booking?.venue?.owner?.avatar && (
					<div className=" min-w-16 ">
						<ImageLoader
							src={booking.venue.owner.avatar.url ?? ""}
							alt={booking.venue.owner.avatar.alt ?? ""}
							imageClassName="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
							width={50}
							height={50}
							errorIcon={false}
						/>
					</div>
				)}
				<div>
					<p>
						Contact your host, <strong>{booking.venue?.owner?.name}</strong> for
						questions at email: <strong>{booking.venue?.owner?.email}</strong>
					</p>
				</div>
			</div>
			{booking.venue?.media && booking.venue?.media.length > 0 && (
				<Image
					src={booking.venue?.media[0].url}
					alt={booking.venue?.media[0].alt}
					width={500}
					height={500}
					className="h-96 w-full rounded-lg object-cover"
				/>
			)}
			<h2 className="my-5 pb-2 text-xs font-bold uppercase text-gray-700">
				Booking details
			</h2>
			<div className="grid grid-cols-2">
				<div className="bg-yellow-50 p-2">Check-in:</div>
				<div className="bg-yellow-50 p-2">
					{new Date(booking.dateFrom).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
				<div className="p-2">Check-out</div>
				<div className="p-2">
					{new Date(booking.dateTo).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
				<div className="bg-yellow-50 p-2">Guests</div>
				<div className="bg-yellow-50 p-2">{booking.guests}</div>
				<div className="p-2">Booking date</div>
				<div className="p-2">
					{new Date(booking.created).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
			</div>

			{isPreviousBooking && (
				<div className="mt-10">
					<RateBooking currentRating={rating} booking={booking} />
				</div>
			)}
			{!isPreviousBooking && (
				<div className="my-5">
					<CancelBooking id={booking.id} />
				</div>
			)}
		</div>
	);
}
