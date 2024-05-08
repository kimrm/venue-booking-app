"use client";
import { useState, useEffect, useContext } from "react";
import DateRangeSelector from "../_components/dateRangeSelector";
import { useFormState, useFormStatus } from "react-dom";
import checkAvailability from "../_actions/checkAvailability";
import confirmBooking from "../_actions/confirmBooking";
import Venue from "@/types/Venue";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

function getDayName(date: Date | null) {
	if (!date) return "";
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	return days[date.getDay()];
}

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

function BookingForm({ venue }: { venue: Venue }) {
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
	const [guests, setGuests] = useState<number>(venue.maxGuests);
	const [inValidGuests, setInValidGuests] = useState<boolean>(false);

	useEffect(() => {
		if (guests < 1 || !guests) {
			setInValidGuests(true);
		} else {
			setInValidGuests(false);
		}
	}, [guests, venue, setInValidGuests]);

	useEffect(() => {
		console.log(state.data);
	}, [state]);

	useEffect(() => {
		console.log(bookingState);
	}, [bookingState]);

	function handleDatesSelected(dates: (Date | null)[]) {
		setStartDate(dates[0]);
		setEndDate(dates[1]);
		if (dates[0] && dates[1]) {
			const diff = dates[1].getTime() - dates[0].getTime();
			const days = diff / (1000 * 60 * 60 * 24);
			setDays(days);
		}
	}

	return (
		<div>
			<h3 className="text-sm font-bold uppercase">Step 1</h3>
			<p className="my-3">When do you plan to stay?</p>
			<DateRangeSelector datesSelected={handleDatesSelected} />
			{days > 0 && (
				<div className="my-2">
					<p>
						You have selected <span className="font-bold">{days} days</span>.
						From {getDayName(startDate)} to {getDayName(endDate)}.
					</p>
					<p>
						Total price ({venue.price}*{days}): {days * venue.price}
					</p>
					<p className="mt-3 max-w-prose text-gray-700">
						The calendar would have indicated availability, but we have to do a
						final validation before you may confirm your booking.
					</p>
				</div>
			)}
			{state.data.availability === false && (
				<form action={formAction}>
					<input type="hidden" name="venueId" value={venue.id} />
					<input type="hidden" name="startDate" value={startDate?.toString()} />
					<input type="hidden" name="endDate" value={endDate?.toString()} />
					<SubmitButton
						pendingText="Processing..."
						defaultText="Check availability"
					/>
				</form>
			)}
			{state.data.availability === true && (
				<>
					<p>The dates are available</p>
					<form action={confirmBookingAction}>
						<div className="mt-3 flex flex-col gap-2">
							<label htmlFor="guests">How many guests?</label>
							<input
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
							defaultText="Confirm"
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
