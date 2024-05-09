"use client";
import { useState, useEffect, useContext } from "react";
import DateRangeSelector from "../_components/dateRangeSelector";
import { useFormState, useFormStatus } from "react-dom";
import checkAvailability from "../_actions/checkAvailability";
import confirmBooking from "../_actions/confirmBooking";
import Venue from "@/types/Venue";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

function getDayName(date: Date | null) {
	if (!date) return "";
	const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
	return days[date.getDay()];
}

export default function BookingForm({ venue }: { venue: Venue }) {
	const [days, setDays] = useState<number>(0);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [state, formAction] = useFormState(checkAvailability, {
		data: { bookings: [], availability: false },
	});
	const [bookingState, confirmBookingAction] = useFormState(confirmBooking, {
		success: false,
		message: "Undefined error",
		data: { status: 500 },
	});
	const [dateError, setDateError] = useState<boolean>(false);
	const [guests, setGuests] = useState<number>(venue.maxGuests);
	const [inValidGuests, setInValidGuests] = useState<boolean>(false);
	const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (guests < 1 || !guests) {
			setInValidGuests(true);
		} else {
			setInValidGuests(false);
		}
	}, [guests, venue, setInValidGuests]);

	useEffect(() => {
		setDateError(!state.data.availability);
	}, [state]);

	useEffect(() => {
		if (bookingState.success) {
			setBookingSuccess(true);
		}
	}, [bookingState]);

	function handleDatesSelected(dates: (Date | null)[]) {
		setStartDate(dates[0]);
		setEndDate(dates[1]);
		if (dates[0] && dates[1]) {
			const diff = dates[1].getTime() - dates[0].getTime();
			const days = diff / (1000 * 60 * 60 * 24);
			setDays(days);
		} else {
			setDays(0);
			setDateError(false);
		}
	}

	if (bookingSuccess && startDate && endDate && days > 0) {
		return (
			<Confirmation
				startDate={startDate}
				endDate={endDate}
				days={days}
				venue={venue}
			/>
		);
	}

	return (
		<div>
			<h3 className="mb-3 text-sm font-bold uppercase">Quick booking</h3>
			<div className="-mx-2 rounded bg-gray-50 p-2">
				<p className="font-bold">{venue.name}</p>
				<p>{venue.location?.country ?? ""}</p>
				<table className="mt-3">
					<tbody>
						<tr>
							<td className="text-gray-600">Price per day:</td>
							<td>${venue.price}</td>
						</tr>
						<tr>
							<td className="text-gray-600">Max guests:</td>
							<td>{venue.maxGuests}</td>
						</tr>
					</tbody>
				</table>
				<div className="my-3 flex items-center gap-5">
					<div className=" flex h-12 w-12 rounded-full">
						{venue.owner?.avatar && (
							<Image
								src={venue.owner.avatar.url ?? ""}
								alt={venue.owner.avatar.alt ?? ""}
								className="h-auto w-auto cursor-pointer rounded-full object-cover object-center"
								width={50}
								height={50}
							/>
						)}
					</div>
					<div>
						<strong>{venue.owner?.name}</strong> is your host
					</div>
				</div>
			</div>

			{days === 0 && (
				<SelectDates handleDatesSelected={handleDatesSelected} venue={venue} />
			)}

			{days > 0 && startDate && endDate && (
				<Summary
					startDate={startDate}
					endDate={endDate}
					days={days}
					price={venue.price}
				/>
			)}

			{state.data.availability === false && days > 0 && (
				<form action={formAction}>
					{dateError ? <DateErrorMessage /> : <VerifyMessage />}
					<input type="hidden" name="venueId" value={venue.id} />
					<input type="hidden" name="startDate" value={startDate?.toString()} />
					<input type="hidden" name="endDate" value={endDate?.toString()} />
					<SubmitButton
						pendingText="Processing..."
						defaultText="Verify dates"
					/>
					<button
						type="button"
						onClick={() => {
							setStartDate(null);
							setEndDate(null);
							setDays(0);
						}}
						className="ml-3 mt-4 rounded-lg bg-yellow-100 px-4 py-2 font-bold text-yellow-950 hover:bg-yellow-200 disabled:text-gray-500"
					>
						Change dates
					</button>
				</form>
			)}

			{state.data.availability === true && !bookingState.success && (
				<>
					<p className="mt-3 flex max-w-prose items-center text-green-600">
						<span className="mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="inline h-6 w-6 "
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m4.5 12.75 6 6 9-13.5"
								/>
							</svg>
						</span>
						Dates are available. Please add guests and confirm your booking.
					</p>

					<form action={confirmBookingAction}>
						<div className="mt-3 flex flex-col gap-2">
							<label htmlFor="guests">How many guests?</label>
							<input
								className="w-24 rounded p-2"
								type="number"
								name="guests"
								id="guests"
								min={1}
								defaultValue={guests}
								onChange={(e) => setGuests(parseInt(e.target.value))}
							/>
							{guests > venue.maxGuests && (
								<span className="text-red-600">
									Max. {venue.maxGuests} guests.
								</span>
							)}
							{inValidGuests && (
								<span className="text-red-600">
									Please enter minimum 1 guest
								</span>
							)}
						</div>
						<input type="hidden" name="venueId" value={venue.id} />
						<input
							type="hidden"
							name="startDate"
							value={startDate?.toString()}
						/>
						<input type="hidden" name="endDate" value={endDate?.toString()} />
						<SubmitButton
							disabled={inValidGuests || guests > venue.maxGuests}
							pendingText="Processing..."
							defaultText="Confirm booking"
						/>
					</form>
				</>
			)}
		</div>
	);
}

function SubmitButton({
	pendingText,
	defaultText,
	disabled,
}: {
	pendingText: string;
	defaultText: string;
	disabled?: boolean;
}) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={disabled}
			className="mt-4 rounded-lg bg-yellow-300 px-4 py-2 font-bold text-yellow-950 hover:bg-yellow-400 disabled:text-gray-500"
		>
			{pending ? pendingText : defaultText}
		</button>
	);
}

function SelectDates({
	handleDatesSelected,
	venue,
}: {
	handleDatesSelected: (dates: (Date | null)[]) => void;
	venue: Venue;
}) {
	return (
		<div>
			<p className="my-3">Select dates to start</p>
			<DateRangeSelector
				excludeDateIntervals={venue.bookings?.map((booking) => ({
					start: new Date(booking?.dateFrom),
					end: new Date(booking?.dateTo),
				}))}
				datesSelected={handleDatesSelected}
			/>
		</div>
	);
}

function Summary({
	startDate,
	endDate,
	days,
	price,
}: {
	startDate: Date;
	endDate: Date;
	days: number;
	price: number;
}) {
	return (
		<div className="my-2">
			<div className="my-5">
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
					{days * price}
				</p>
			</div>
		</div>
	);
}

function DateErrorMessage() {
	return (
		<p className="mt-3 flex max-w-prose items-center text-red-600">
			<span className="mr-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
					/>
				</svg>
			</span>
			Dates are unavailable. Please try again with different dates.
		</p>
	);
}

function VerifyMessage() {
	return (
		<p className="mt-3 flex max-w-prose items-center text-yellow-600">
			<span className="mr-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
					/>
				</svg>
			</span>
			It looks like these dates are available. Please click &quot;Verify
			dates&quot; to confirm.
		</p>
	);
}

function Confirmation({
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
