"use client";
import { useContext } from "react";
import Venue from "@/types/Venue";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import BookingForm from "./bookingForm";
import Image from "next/image";

export default function Booking({ venue }: { venue: Venue }) {
	const { profile } = useContext(UserContext) || {};

	return (
		<div className="rounded-lg bg-gray-100 p-4">
			{!profile ? (
				<div>
					<Link className="text-yellow-600" href="/login">
						Log in
					</Link>{" "}
					or{" "}
					<Link className="text-yellow-600" href="/signup">
						Create a User
					</Link>{" "}
					to book this venue.
				</div>
			) : (
				<BookingForm venue={venue} />
			)}
		</div>
	);
}
