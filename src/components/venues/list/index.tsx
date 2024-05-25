"use client";

import { useState, useEffect } from "react";
import Venue from "../../../types/Venue";
import useSWRInfinite from "swr/infinite";
import fetcher from "@/utils/fetcher";
import VenuesGridSkeleton from "@/components/loaders/VenuesGridSkeleton";
import ListingCard from "../listingCard";

interface VenueData {
	data: Venue[];
	meta: {
		isFirstPage: boolean;
		isLastPage: boolean;
		currentPage: number;
		previousPage: number | null;
		nextPage: number | null;
		pageCount: number;
		totalCount: number;
	};
}

interface Filters {
	lat: number;
	lng: number;
	search: string;
	city: string;
	country: string;
	continent: string;
	minGuests: number;
	maxPrice: number;
	wifi: string | null;
	parking: string | null;
	breakfast: string | null;
	pets: string | null;
}

const getKey = (
	pageIndex: number,
	previousPageData: VenueData | null,
	filters: Filters
) => {
	if (previousPageData && previousPageData.meta.isLastPage) return null;

	const query = new URLSearchParams(
		`page=${pageIndex + 1}&search=${filters.search}&continent=${filters.continent}&guests=${
			filters.minGuests
		}&max_price=${filters.maxPrice}&city=${filters.city}&country=${filters.country}&continent=${filters.continent}&wifi=${filters.wifi}&parking=${filters.parking}&breakfast=${filters.breakfast}&pets=${filters.pets}&lat=${filters.lat}&lng=${filters.lng}`
	).toString();

	return `/api/venues?${query}`;
};

export default function List({ filters }: { filters: Filters }) {
	const [isFetching, setIsFetching] = useState(false);
	const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

	const { data, size, setSize, error, isValidating, isLoading } =
		useSWRInfinite<VenueData>(
			(pageIndex, previousPageData) =>
				getKey(pageIndex, previousPageData, filters),
			fetcher
		);

	const venues = data ? data.flatMap((page) => page.data) : [];

	useEffect(() => {
		if (!infiniteScrollEnabled) return;
		const onScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop + 10 >=
				document.documentElement.scrollHeight
			) {
				setIsFetching(true);
			}
		};

		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, [infiniteScrollEnabled]);

	const showMoreVenuesHandler = () => {
		setIsFetching(true);
		setInfiniteScrollEnabled(true);
	};

	useEffect(() => {
		function loadMoreVenues() {
			if (data && !data[data.length - 1].meta.isLastPage && !isValidating) {
				setSize(size + 1);
			}
		}
		if (isFetching && !isValidating) {
			loadMoreVenues();
			setIsFetching(false);
		}
	}, [isFetching, isValidating, data, setSize, size]);

	return (
		<div>
			{isLoading && !isFetching && <VenuesGridSkeleton />}

			<div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{!error &&
					venues.map((venue: Venue) => {
						return <ListingCard key={venue.id} venue={venue} />;
					})}
			</div>

			<div className="mt-5 flex flex-col items-center justify-center gap-5">
				{isValidating && isFetching && <VenuesGridSkeleton items={5} />}
				{data && data[data.length - 1].meta.isLastPage ? (
					<p className="mt-5 text-gray-600">
						{venues.length === 0
							? "No venues found. Try different filters."
							: "No more venues to show. Check back later for more."}
					</p>
				) : (
					!isValidating &&
					!isFetching && (
						<div className="text-center">
							<button
								className="rounded bg-black p-2 font-bold text-white transition-all duration-200 hover:bg-gray-800"
								onClick={showMoreVenuesHandler}
							>
								Show more venues
							</button>
						</div>
					)
				)}
			</div>
		</div>
	);
}
