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
				<motion.p
					initial={{ x: 100, opacity: 0 }}
					animate={{
						x: 0,
						opacity: 1,
						transition: { duration: 0.2, delay: 0.1 },
					}}
					className=" flex  w-fit max-w-prose flex-wrap text-wrap rounded-l-lg rounded-r-xl border-b-8 border-r-8 border-b-yellow-500 border-r-yellow-500 bg-gray-100 p-2 text-gray-900 outline-4  outline-black"
				>
					{venue.description}
				</motion.p>
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
						className="mt-10 w-fit rounded-2xl bg-yellow-200 px-4 py-2 text-lg font-bold uppercase text-gray-900 transition-transform duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-gray-800 hover:shadow-lg"
						href={`/venues/${venue.id}`}
					>
						Book today
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
