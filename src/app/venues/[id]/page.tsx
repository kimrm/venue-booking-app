import Venue from "@/types/Venue";
import CreateBooking from "@/components/booking/CreateBooking";
import { getById } from "@/actions/venues";
import VenueDetails from "@/app/venues/_components/venueDetails";
import VenueImageLibrary from "@/app/venues/_components/venueImageLibrary";
import VenueImage from "@/app/venues/_components/venueImage";

interface Props {
	params: { id: string };
}

export default async function VenuePage({ params }: Props) {
	const venue: Venue | any = await getById(params.id);
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
			<CreateBooking />
		</div>
	);
}
