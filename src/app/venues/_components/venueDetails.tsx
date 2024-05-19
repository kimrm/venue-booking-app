"use client";
import ImageLoader from "@/components/ImageLoader";
import Venue from "@/types/Venue";

export default function VenueDetails({ venue }: { venue: Venue }) {
	return (
		<>
			<h1 className="my-4 font-serif text-5xl font-bold">{venue.name}</h1>
			<div className="flex items-center justify-between">
				<div>
					<div className="my-10 flex items-center gap-3">
						{venue.owner?.avatar && (
							<ImageLoader
								src={venue.owner.avatar.url ?? ""}
								alt={venue.owner.avatar.alt ?? ""}
								imageClassName="h-12 w-12 cursor-pointer rounded-full object-cover object-center"
								width={50}
								height={50}
								errorIcon={false}
							/>
						)}
						<div className="text-sm uppercase tracking-wide">
							{venue.owner?.name}
						</div>
					</div>
				</div>
				<div className="flex items-center">
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
					<span className="ml-1">{venue.rating}</span>
				</div>
			</div>
			<p className="max-w-prose whitespace-pre-line">{venue.description}</p>
		</>
	);
}
