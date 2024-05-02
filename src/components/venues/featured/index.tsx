import fetcher from "@/utils/fetcher";
import Venue from "@/types/Venue";
import { API_URL } from "@/vars/api";
import Image from "next/image";
import Link from "next/link";
import Item from "./item";

async function getData() {
	const featuredVenueIds = [
		"b3b0f4dd-2d13-470d-af3e-c332a3b534c9",
		"eb1f109e-4833-464c-a489-547f7861cca0",
		"b6441f43-9da8-48df-8eef-9772c6d6ddba",
		"2a2a5d7c-8f67-47e0-91ee-a3280553ca54",
	];
	const featuredVenues: Venue[] = [];
	for (const id of featuredVenueIds) {
		const venue = await fetcher(
			`${API_URL}/venues/${id}`,
			"GET",
			null,
			process.env.API_KEY
		);
		featuredVenues.push(venue.data);
	}
	const randomVenue: Venue =
		featuredVenues[Math.floor(Math.random() * featuredVenues.length)];

	const otherVenues = await fetcher(
		`${API_URL}/venues?_bookings=true&limit=40`,
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
						<Link
							key={venue.id}
							href={`/venues/${venue.id}`}
							className="rounded-2xl bg-white p-2 outline-gray-200 transition-all duration-300 hover:shadow-lg hover:outline"
						>
							{venue.media && venue.media.length > 0 && (
								<Image
									src={venue?.media[0].url}
									alt={venue.media[0].alt}
									width={1200}
									height={800}
									className="h-96 w-full rounded-xl object-cover"
								/>
							)}
							<div className="p-2">
								<h2 className="text-lg font-bold uppercase text-gray-900">
									{venue.name}
								</h2>
								<p className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-900">
									{venue.description}
								</p>
								<p>Rating: {venue.rating}</p>
								<p>Bookings: {venue.bookings?.length}</p>
							</div>
						</Link>
					))}
				</div>
			</article>
		</div>
	);
}
