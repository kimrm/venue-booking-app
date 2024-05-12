"use client";
import Venue from "@/types/Venue";
import { motion } from "framer-motion";
import Link from "next/link";
import { getDayName } from "@/utils/dates";

export default function Confirmation({
	startDate,
	endDate,
	days,
	venue,
}: {
	startDate: Date;
	endDate: Date;
	days: number;
	venue: Venue;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<h3 className="text-xl font-bold uppercase">Booking confirmed!</h3>
			<p className="my-2">
				You can view all your bookings in your{" "}
				<Link className="text-yellow-600" href="/profile">
					Profile Pages
				</Link>
				.
			</p>

			<div className="my-5 rounded bg-yellow-100 p-4">
				<h3 className="text-sm font-bold uppercase tracking-wide text-yellow-900">
					Booking Summary
				</h3>
				<div className="my-2">
					<p className="flex items-center gap-2">
						<span className="mr-3 text-xs uppercase">Duration:</span>
						<strong className="text-sm md:text-base">
							{getDayName(startDate)} {startDate?.toLocaleDateString()}
						</strong>{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-2 w-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
						<strong className="text-sm md:text-base">
							{getDayName(endDate)} {endDate?.toLocaleDateString()}
						</strong>
					</p>
					<p>
						<span className="mr-3 text-xs uppercase">Price total:</span> $
						<strong>{days * venue.price}</strong>
					</p>
				</div>
				<h3 className="mt-5 font-serif text-2xl uppercase tracking-wide ">
					Welcome to {venue.name}
				</h3>
				<p className="my-3">We hope you&apos;ll have a pleasant stay!</p>
			</div>
		</motion.div>
	);
}
