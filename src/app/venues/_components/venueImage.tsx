"use client";
import ImageLoader from "@/components/ImageLoader";
import Venue from "@/types/Venue";

interface Props {
	venue: Venue;
	expandedClicked: (index: number) => void;
}

export default function VenueImage({ venue, expandedClicked }: Props) {
	return venue?.media && venue.media.length > 0 ? (
		<div>
			<div className="relative">
				<button
					onClick={() => expandedClicked(0)}
					className="absolute right-2 top-2 z-20 rounded border bg-white bg-opacity-50 "
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
						/>
					</svg>
				</button>
				<ImageLoader
					priority
					src={venue.media ? venue.media[0].url : ""}
					alt={venue.media ? venue.media[0].alt : ""}
					width={800}
					height={800}
					imageClassName=" h-96 w-full rounded-lg object-cover object-center"
				/>
			</div>
		</div>
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
