"use client";
import Image from "next/image";
import Venue from "@/types/Venue";

interface Props {
	venue: Venue;
	expandedClicked: (index: number) => void;
}
export default function VenueImageLibrary({ venue, expandedClicked }: Props) {
	return (
		<div className="rounded bg-gray-100 p-4">
			<h3 className="mb-5 text-sm uppercase tracking-wide">
				Images from {venue.name}
			</h3>
			<div className="flex items-center justify-between">
				<div className="mx-auto grid grid-cols-2 flex-wrap gap-4 sm:grid-cols-4 lg:grid-cols-3">
					{venue.media &&
						venue.media.length > 0 &&
						venue.media?.map((media, index) => {
							return (
								<Image
									key={media.id}
									src={media.url}
									alt={media.alt}
									width={200}
									height={200}
									title={media.alt}
									onClick={() => expandedClicked(index)}
									className="h-40 w-full cursor-pointer rounded-lg object-cover sm:w-40"
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
}
