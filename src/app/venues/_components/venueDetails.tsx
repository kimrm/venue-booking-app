"use client";
import ImageLoader from "@/components/ImageLoader";
import Venue from "@/types/Venue";

export default function VenueDetails({ venue }: { venue: Venue }) {
	return (
		<>
			<h1 className="my-2 font-serif text-5xl font-bold">{venue.name}</h1>
			<div className="flex items-center justify-between">
				<div>
					<div className="mt-10 flex items-center gap-3">
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
			<section id="bookingDetails" className="mt-5">
				<h3 className="mt-10 font-serif text-3xl font-bold">Venue details</h3>
				<div className="mt-5 flex flex-wrap gap-5">
					<Details venue={venue} />
					<Accommodations venue={venue} />
				</div>
			</section>
			<h3 className="inline-block min-w-24 pt-10 text-xs uppercase tracking-wide text-gray-600">
				Description
			</h3>
			<p className="max-w-prose whitespace-pre-line">{venue.description}</p>
		</>
	);
}

function Details({ venue }: { venue: Venue }) {
	return (
		<div className="flex flex-col gap-2 rounded  text-sm text-gray-600">
			{venue.location.city && (
				<div>
					<span className="flex items-center gap-2">
						<svg
							className="size-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
								clip-rule="evenodd"
							/>
						</svg>
						{venue.location.city}, {venue.location.country}
					</span>
				</div>
			)}
			{venue.location.continent && (
				<div>
					<span className="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
							/>
						</svg>

						{venue.location.continent}
					</span>
				</div>
			)}
			<div>
				<span className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="inline size-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
					{venue.price} per night
				</span>
			</div>
			<div>
				<span className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="inline size-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
						/>
					</svg>
					{venue.maxGuests} guests max.
				</span>
			</div>
		</div>
	);
}

function Accommodations({ venue }: { venue: Venue }) {
	return (
		<div className="flex flex-col gap-2 rounded  text-sm text-gray-600">
			{Object.keys(venue.meta)
				.filter(
					(key: string) => venue.meta[key as keyof typeof venue.meta] === true
				)
				.map((key) => {
					return (
						<div key={key} className="flex items-center gap-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
							<span className="capitalize">{key}</span>
						</div>
					);
				})}
		</div>
	);
}
