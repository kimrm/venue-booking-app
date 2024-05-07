import Venue from "@/types/Venue";
import CreateBooking from "@/components/booking/CreateBooking";
import ImageLoader from "@/components/ImageLoader";
import Image from "next/image";
import { getById } from "@/actions/venues";

interface Props {
	params: { id: string };
}

export default async function VenuePage({ params }: Props) {
	const venue: Venue | any = await getById(params.id);

	return (
		<div>
			<VenueImage venue={venue} />
			<div className="grid grid-cols-1 lg:grid-cols-3">
				<div className="col-span-2">
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

function VenueDetails({ venue }: { venue: Venue }) {
	return (
		<>
			<h1 className="my-4 font-serif text-5xl font-bold">{venue.name}</h1>
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
			<p className="max-w-prose whitespace-pre-line">{venue.description}</p>
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
								errorIcon={false}
							/>
						)}
					</div>
					<div>
						<strong>{venue.owner?.name}</strong> is your host
					</div>
				</div>
			</div>
		</>
	);
}

function VenueImage({ venue }: { venue: Venue }) {
	return venue?.media && venue.media.length > 0 ? (
		<ImageLoader
			priority
			src={venue.media ? venue.media[0].url : ""}
			alt={venue.media ? venue.media[0].alt : ""}
			width={800}
			height={800}
			imageClassName=" h-96 w-full rounded-lg object-cover object-center"
		/>
	) : (
		<div className="h-48 w-full overflow-hidden rounded-lg bg-gray-300 lg:h-96">
			<div className="flex items-center justify-center gap-1 bg-yellow-500 p-4 text-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="mr-4 h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
					/>
				</svg>
				No images added to this venue yet
			</div>
		</div>
	);
}

function VenueImageLibrary({ venue }: { venue: Venue }) {
	return (
		<div className="flex w-full flex-wrap items-center gap-2 lg:items-start">
			{venue.media &&
				venue.media.length > 0 &&
				venue.media?.map((media) => {
					return (
						<Image
							key={media.id}
							src={media.url}
							alt={media.alt}
							width={200}
							height={200}
							title={media.alt}
							className="mx-auto h-40 w-40 rounded-lg object-cover xl:mx-0 "
						/>
					);
				})}
		</div>
	);
}
