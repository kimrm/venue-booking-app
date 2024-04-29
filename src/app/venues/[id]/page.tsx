import Venue from "@/types/Venue";
import BookVenue from "@/components/BookVenue";
import CreateBooking from "@/components/booking/CreateBooking";
import ImageLoader from "@/components/ImageLoader";
import { Suspense } from "react";
import Image from "next/image";

interface Props {
	params: { id: string };
}

interface VenueData {
	data: Venue;
}

async function getData(id: string): Promise<VenueData> {
	const res = await fetch(
		"https://venue-booking-5kdesqce6-kimrms-projects.vercel.app/api/venues/" +
			id
	);
	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error(res.statusText);
	}
	return res.json();
}

export default async function VenuePage({ params }: Props) {
	const data: VenueData | any = await getData(params.id);
	const venue = data.data;

	return (
		<div>
			<ImageLoader
				priority
				src={venue.media ? venue.media[0].url : ""}
				alt={venue.media ? venue.media[0].alt : ""}
				width={800}
				height={800}
				imageClassName="h-auto w-full rounded-lg object-cover lg:h-96"
			/>

			<div className="grid grid-cols-3">
				<div className="col-span-2">
					<Suspense fallback={"Loading venue name"}>
						<h1 className="my-4 font-serif text-5xl font-bold">{venue.name}</h1>
					</Suspense>
					<div className="mb-5 rounded bg-offwhite p-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="inline h-6 w-6"
						>
							<path
								fillRule="evenodd"
								d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="ml-3">rated {venue.rating}</span>
					</div>
					<Suspense fallback={"Loading venue description"}>
						<p className="max-w-prose">{venue.description}</p>
					</Suspense>
					<Suspense fallback={"Loading venue location"}>
						<div>
							<div className="my-10 flex items-center gap-5">
								<div className=" flex h-12 w-12 rounded-full">
									{venue.owner?.avatar && (
										<ImageLoader
											src={venue.owner.avatar.url ?? ""}
											alt={venue.owner.avatar.alt ?? ""}
											imageClassName="h-auto w-auto cursor-pointer rounded-full object-cover object-center"
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
					</Suspense>
				</div>
				<div className="mt-10 p-4 ">
					<div className="grid grid-flow-col gap-2">
						{venue.media.length > 0 &&
							venue.media?.map(
								(media: { id: string; url: string; alt: string }) => {
									return (
										<Image
											key={media.id}
											src={media.url}
											alt={media.alt}
											width={200}
											height={200}
											className="h-40 w-40 rounded-lg object-cover"
										/>
									);
								}
							)}
					</div>
				</div>
			</div>
			<CreateBooking />
		</div>
	);
}
