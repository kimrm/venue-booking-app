import Venue from "@/types/Venue";
import { getById } from "@/actions/venues";
import VenueDetails from "@/app/venues/_components/venueDetails";
import VenueImageLibrary from "@/app/venues/_components/venueImageLibrary";
import VenueImage from "@/app/venues/_components/venueImage";
import Booking from "../_components/booking";

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
				<h2 className="mb-3 font-serif text-3xl font-bold">
					Booking for -{venue.name}-
				</h2>

				<Booking venue={venue} />
			</section>
		</div>
	);
}
