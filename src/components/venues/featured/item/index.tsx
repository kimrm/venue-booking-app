"use client";
import Venue from "@/types/Venue";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
	venue: Venue;
}

export default function Item({ venue }: Props) {
	return (
		<section id="headliner" className="relative">
			<div className="">
				{venue.media && venue?.media.length > 0 && (
					<Image
						priority
						src={venue?.media[0].url}
						alt={venue.media[0].alt}
						width={1200}
						height={800}
						className="h-96 w-full rounded-xl object-cover"
					/>
				)}
			</div>
			<div className="absolute left-2 top-2 flex flex-col gap-3">
				<motion.h2
					initial={{ x: -100 }}
					animate={{ x: 0, transition: { duration: 0.2 } }}
					className=" w-fit rounded-l-lg rounded-r-xl border-b-8 border-r-8 border-b-yellow-500 border-r-yellow-500 bg-gray-100 p-2 text-lg font-bold uppercase tracking-wide text-gray-900 outline-4 outline-black lg:text-4xl"
				>
					{venue.name}
				</motion.h2>
				<motion.div
					initial={{ opacity: 0, x: 100 }}
					animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
					className="flex w-fit flex-col gap-2 rounded bg-yellow-300 p-4 text-sm text-gray-900"
				>
					{venue.location.city && (
						<div>
							<span
								className="flex items-center gap-2"
								aria-label="City of the venue"
								title="City of the venue"
							>
								<svg
									className="size-4 "
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
								{venue.location.city}
							</span>
						</div>
					)}
					<div>
						<span
							className="flex items-center gap-2"
							aria-label="Price for the venue"
							title="Price for the venue"
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
							{venue.maxGuests} guests max
						</span>
					</div>
				</motion.div>

				<motion.div
					initial={{ x: -100, opacity: 0 }}
					animate={{
						x: 0,
						opacity: 1,
						transition: { duration: 0.2, delay: 0.1 },
					}}
					className="flex overflow-visible"
				>
					<Link
						className="mt-10 w-fit rounded-2xl border border-white bg-yellow-400 px-4 py-2 text-sm font-bold uppercase tracking-wider text-gray-800 transition-transform duration-300 hover:scale-105 hover:rounded-2xl hover:border-0 hover:border-b-4 hover:border-r-4 hover:border-b-white hover:border-r-white hover:bg-yellow-500 hover:text-gray-700 hover:outline-black"
						href={`/venues/${venue.id}`}
					>
						Book today
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
