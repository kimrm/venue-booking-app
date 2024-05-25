import Venue from "@/types/Venue";
import { getById } from "@/actions/venues";
import Booking from "../_components/booking";
import Map from "@/app/venues/_components/map";
import Header from "@/app/venues/_components/header";

interface Props {
	params: { id: string };
}

export default async function VenuePage({ params }: Props) {
	const venue: Venue | any = await getById(params.id);

	if (venue.code === 404) {
		return (
			<div className="border-l-4 border-red-500 bg-red-100 p-6 text-red-900">
				We can&apos;t find this venue right now. It may have been unpublished by
				its owner.
			</div>
		);
	}

	return (
		<div>
			<Header venue={venue} />

			<h3 className="mt-10 font-serif text-3xl font-bold">Location</h3>
			{venue.location?.lat && venue.location?.lng && (
				<section id="location" className="mt-5 h-72">
					<Map
						location={{
							latitude: venue.location?.lat,
							longitude: venue.location?.lng,
						}}
					/>
				</section>
			)}
			<section id="address" className="mt-5">
				<div>
					<span className="inline-block min-w-24 text-xs uppercase tracking-wide">
						Address
					</span>{" "}
					{venue.location?.address}
				</div>
				<div>
					<span className="inline-block min-w-24 text-xs uppercase tracking-wide">
						City
					</span>{" "}
					{venue.location?.city}
				</div>
				<div>
					<span className="inline-block min-w-24 text-xs uppercase tracking-wide">
						Country
					</span>{" "}
					{venue.location?.country}
				</div>
			</section>
			<section id="booking" className="mt-10">
				<h2 className="mb-5 font-serif text-3xl font-bold">Book your stay</h2>

				<Booking venue={venue} />
			</section>
		</div>
	);
}
