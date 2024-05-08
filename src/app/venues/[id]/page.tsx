import Venue from "@/types/Venue";
import { getById } from "@/actions/venues";
import VenueDetails from "@/app/venues/_components/venueDetails";
import VenueImageLibrary from "@/app/venues/_components/venueImageLibrary";
import VenueImage from "@/app/venues/_components/venueImage";
import DateRangeSelector from "../_components/dateRangeSelector";

interface Props {
	params: { id: string };
}

export default async function VenuePage({ params }: Props) {
	const venue: Venue | any = await getById(params.id);

	async function datesSelected(startDate: Date | null, endDate: Date | null) {
		"use server";
		console.log(startDate, endDate);
	}

	return (
		<div>
			<VenueImage venue={venue} />
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
				<div className="xl:col-span-2">
					<VenueDetails venue={venue} />
				</div>
				<div className="mt-10 p-8">
					<VenueImageLibrary venue={venue} />
				</div>
			</div>
			<section id="booking" className="mt-10">
				<h2 className="mb-3 font-serif text-3xl font-bold">Booking</h2>

				<div className="rounded-lg bg-gray-100 p-4">
					<h3 className="text-sm font-bold uppercase">Step 1</h3>
					<p className="my-3">When do you plan to stay?</p>
					<DateRangeSelector />
					<button className="mt-4 rounded-lg bg-yellow-300 px-4 py-2 font-bold text-white hover:bg-yellow-400">
						Proceed
					</button>
				</div>
			</section>
		</div>
	);
}
