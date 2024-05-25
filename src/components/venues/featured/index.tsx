import fetcher from "@/utils/fetcher";
import Venue from "@/types/Venue";
import { API_URL } from "@/vars/api";
import Item from "./item";
import ListingCard from "../listingCard";
import { sql } from "@vercel/postgres";

async function getData() {
	const { rows } = await sql`select venue_id from venue_booking_app_featured`;
	const featuredVenueIds = rows.map((row: any) => row.venue_id);
	const featuredVenues: Venue[] = [];
	for (const id of featuredVenueIds) {
		const venue = await fetcher(
			`${API_URL}/venues/${id}?_owner=true`,
			"GET",
			null,
			process.env.API_KEY
		);
		featuredVenues.push(venue.data);
	}
	const randomVenue: Venue =
		featuredVenues[Math.floor(Math.random() * featuredVenues.length)];

	const otherVenues = await fetcher(
		`${API_URL}/venues?_bookings=true&limit=40&_owner=true`,
		"GET",
		null,
		process.env.API_KEY
	);
	const popularVenues: Venue[] = otherVenues.data
		.sort((a: Venue, b: Venue) => {
			if (!a.bookings?.length || !b.bookings?.length) return 0;
			return b.bookings.length - a.bookings.length;
		})
		.sort((a: Venue, b: Venue) => {
			return b.rating - a.rating;
		});

	return { randomVenue, popularVenues };
}
export default async function FeaturedVenues() {
	const { randomVenue, popularVenues } = await getData();

	return (
		<div>
			<article className="mt-3">
				<h1 className="w-fit p-2 font-serif text-xs font-extrabold uppercase tracking-widest text-gray-700">
					Featured venue
				</h1>
				<Item venue={randomVenue} />
			</article>
			<article className="mt-10">
				<h1 className="w-fit p-2 font-serif text-xs font-extrabold uppercase tracking-widest text-gray-700">
					Popular venues
				</h1>
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{popularVenues.map((venue) => (
						<ListingCard key={venue.id} venue={venue} />
					))}
				</div>
			</article>
		</div>
	);
}
