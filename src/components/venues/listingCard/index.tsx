import React from "react";
import Link from "next/link";
import Venue from "@/types/Venue";
import ImageLoader from "@/components/ImageLoader";
import { formatName } from "@/utils/string";

export default function ListingCard({ venue }: { venue: Venue }) {
	return (
		<Link
			className="overflow-hidden rounded-2xl  bg-white outline-gray-200 transition-all duration-300 hover:shadow-lg hover:outline"
			key={venue.id}
			href={`/venues/${venue.id}`}
		>
			<div className="relative min-h-full rounded-xl bg-gray-100 p-2 transition-all duration-200">
				<div className="absolute left-2 top-2 z-20 flex items-center gap-3 rounded-br-xl  rounded-tl-lg bg-yellow-50 bg-opacity-90 p-2">
					{venue.owner?.avatar && (
						<ImageLoader
							src={venue.owner.avatar.url ?? ""}
							alt={venue.owner.avatar.alt ?? ""}
							imageClassName="h-6 w-6 cursor-pointer rounded-full object-cover object-center"
							width={50}
							height={50}
							errorIcon={false}
						/>
					)}
					<div className="text-xs font-bold uppercase tracking-wide">
						{venue.owner?.name}
					</div>
				</div>
				{venue.media && venue.media.length > 0 ? (
					<ImageLoader
						imageClassName=" cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg w-full h-48 rounded-lg object-cover"
						src={venue.media.length > 0 ? venue.media[0].url : ""}
						alt={venue.media.length > 0 ? venue.media[0].alt : ""}
						width={300}
						height={300}
					/>
				) : (
					<div className="flex h-48 w-full items-center overflow-hidden rounded-lg bg-gray-300">
						<div className="flex h-full items-center justify-center gap-1 bg-yellow-500 p-4  text-yellow-950">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="mr-4 h-12 w-12"
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
				)}
				<div className="mt-2">
					<div className="flex items-start justify-between p-2">
						<h2 className="font-bold">{formatName(venue.name)}</h2>
						<span
							className="flex items-center gap-2 text-gray-600"
							aria-label="Venue rating"
							title="Venue rating"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="h-4 w-4"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
									clipRule="evenodd"
								/>
							</svg>
							{venue.rating.toFixed(0)}
						</span>
					</div>

					<div className="flex flex-col gap-2 rounded  p-2 text-sm text-gray-600">
						{venue.location.city && (
							<div>
								<span
									className="flex items-center gap-2"
									aria-label="City and country of venue"
									title="City and country of venue"
								>
									<svg
										className="size-4 text-gray-800 "
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											fillRule="evenodd"
											d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
											clipRule="evenodd"
										/>
									</svg>
									{venue.location.city}
									{venue.location.country && ", " + venue.location.country}
								</span>
							</div>
						)}
						<div>
							<span
								className="flex items-center gap-2"
								aria-label="Price for venue"
								title="Price for venue"
							>
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
							<span
								className="flex items-center gap-2"
								aria-label="Max. guests allowed"
								title="Max. guests allowed"
							>
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
				</div>
			</div>
		</Link>
	);
}
