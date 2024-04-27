"use client";
import BookVenue from "@/components/BookVenue";

export default function CreateBooking() {
	function datesSelected(startDate: Date | null, endDate: Date | null) {
		console.log(startDate, endDate);
	}

	return (
		<section id="booking" className="mt-10">
			<h2 className="mb-3 font-serif text-3xl font-bold">Booking</h2>
			<h3 className="mb-3 text-lg">When do you plan to stay?</h3>

			<div className="flex items-center justify-center rounded-lg bg-gray-100 p-4">
				<BookVenue dateRangeSelected={datesSelected} />
			</div>
		</section>
	);
}
