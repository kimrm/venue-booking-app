"use client";
import { useState } from "react";
import Venue from "@/types/Venue";
import VenueDetails from "@/app/venues/_components/venueDetails";
import VenueImageLibrary from "@/app/venues/_components/venueImageLibrary";
import VenueImage from "@/app/venues/_components/venueImage";
import VenueImageCarousel from "@/app/venues/_components/venueImageCarousel";
import { AnimatePresence } from "framer-motion";

export default function Header({ venue }: { venue: Venue }) {
	const [carouselDisplayed, setCarouselDisplayed] = useState(false);
	const [initialCarouselImageIndex, setInitialCarouselImageIndex] = useState(0);

	function showCarousel(index: number) {
		setInitialCarouselImageIndex(index);
		setCarouselDisplayed(true);
	}
	return (
		<>
			<AnimatePresence>
				{carouselDisplayed && (
					<VenueImageCarousel
						initialImageIndex={initialCarouselImageIndex}
						venue={venue}
						close={() => setCarouselDisplayed(false)}
					/>
				)}
			</AnimatePresence>
			<VenueImage
				expandedClicked={(index: number) => showCarousel(index)}
				venue={venue}
			/>
			<section id="details" className="grid grid-cols-1 lg:grid-cols-2">
				<div className="mt-3">
					<VenueDetails venue={venue} />
				</div>
				<div className="mt-10 lg:pl-8">
					<VenueImageLibrary
						expandedClicked={(index: number) => showCarousel(index)}
						venue={venue}
					/>
				</div>
			</section>
		</>
	);
}
