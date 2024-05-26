"use client";
import { useState, useContext } from "react";
import { rateVenue } from "@/actions/bookings";
import Booking from "@/types/Booking";
import { UserContext } from "@/context/UserContext";
import { ActionButton } from "@/components/UI/buttons";
import { motion, AnimatePresence } from "framer-motion";

export default function RateBooking({
	currentRating,
	booking,
}: {
	currentRating: number;
	booking: Booking | undefined;
}) {
	const [rating, setRating] = useState(parseFloat(currentRating.toFixed(0)));
	const { profile } = useContext(UserContext) || {};
	const [rateSuccess, setRateSuccess] = useState(false);

	function handleRating() {
		rateVenue(booking?.id ?? "", rating);
		setRateSuccess(true);
	}
	return (
		<div className="relative rounded bg-yellow-100 p-6">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className={`absolute -left-3 -top-3 size-10 rounded-full border border-yellow-500 ${rateSuccess ? "rotate-[360deg] text-green-600 transition-transform ease-in-out " : "text-yellow-500"}`}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
				/>
			</svg>

			<h3 className="font-serif text-2xl">
				Hope you enjoyed your stay, {profile?.name}!
			</h3>
			<p className="mt-3">
				Please rate your experience with{" "}
				<strong>{booking?.venue?.name}: </strong>
			</p>
			<div className="mt-3 flex flex-wrap items-center gap-5">
				<div className="inline-flex gap-2 rounded border border-yellow-950 p-2">
					<select
						onChange={(e) => setRating(parseInt(e.target.value))}
						value={rating}
						className="rounded border border-gray-300 p-2"
					>
						<option value="0">Select</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<ActionButton onClick={handleRating}>Rate</ActionButton>
				</div>
				<AnimatePresence>
					{rateSuccess && (
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
							className="rounded  bg-yellow-50 p-4"
						>
							Thank you for your feedback!
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
