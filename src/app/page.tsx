"use client";

import { useContext, useState, useEffect, use } from "react";
import { UserContext } from "../context/UserContext";
import { UserContextType } from "../context/UserContext";
import ImageLoader from "@/components/ImageLoader";
import LoginForm from "@/components/LoginForm";
import Venue from "./types/Venue";
import useSWRInfinite from "swr/infinite";
import fetcher from "@/utils/fetcher";
import Link from "next/link";

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
	continent: string;
	guests: string;
	maxPrice: string;
}

const getKey = (
	pageIndex: number,
	previousPageData: VenueData | null,
	filters: Filters
) => {
	if (previousPageData && previousPageData.meta.isLastPage) return null;

	const query = new URLSearchParams(
		`page=${pageIndex + 1}&continent=${filters.continent}&guests=${
			filters.guests
		}&max_price=${filters.maxPrice}`
	).toString();

	return `/api/venues?${query}`;
};

export default function Home() {
	const { profile } =
		useContext<UserContextType | undefined>(UserContext) || {};

	const [isFetching, setIsFetching] = useState(false);
	const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);
	const [continent, setContinent] = useState<string>("");
	const [guests, setGuests] = useState<string>("");
	const [maxPrice, setMaxPrice] = useState<string>("");

	const { data, size, setSize, error, isValidating, isLoading } =
		useSWRInfinite<VenueData>(
			(pageIndex, previousPageData) =>
				getKey(pageIndex, previousPageData, {
					continent,
					guests,
					maxPrice,
				}),
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
			{isLoading && !isFetching && (
				<p className="mt-10 text-center">Loading data...</p>
			)}
			<div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{!error &&
					venues.map((venue: Venue) => {
						return (
							<Link
								href={`/venues/${venue.id}`}
								key={venue.id}
								className="rounded-xl bg-offwhite p-2 transition-all duration-200"
							>
								{venue.media && (
									<ImageLoader
										className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
										url={venue.media[0].url}
										description={venue.media[0].alt}
									/>
								)}
								<div className="mt-2">
									<div className="flex items-center justify-between">
										<h2 className="font-bold">{venue.name}</h2>
										<span className="flex items-center gap-2 text-gray-600">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="h-4 w-4"
											>
												<path
													fillRule="evenodd"
													d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
													clipRule="evenodd"
												/>
											</svg>
											{venue.rating.toFixed(1)}
										</span>
									</div>
									<p>${venue.price} per night</p>
									<p>Guests: {venue.maxGuests}</p>
								</div>
							</Link>
						);
					})}
			</div>

			<div className="mt-5 flex flex-col items-center justify-center gap-5">
				{isValidating && isFetching && <p>Loading venues...</p>}
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
