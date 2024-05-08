"use client";
import Image from "next/image";
import Venue from "@/types/Venue";

export default function VenueImageLibrary({ venue }: { venue: Venue }) {
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
