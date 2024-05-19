import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Venue from "@/types/Venue";
import { transition } from "@/components/UI/buttons/transitions";

interface Props {
	initialImageIndex: number;
	venue: Venue;
	close: () => void;
}

export default function VenueImageCarousel({
	initialImageIndex,
	venue,
	close,
}: Props) {
	const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

	const imageNext = useCallback(
		(e: any) => {
			e.stopPropagation();
			const length = venue.media?.length ?? 0;
			setCurrentImageIndex((prev) => (prev + 1) % length);
		},
		[venue]
	);

	const imagePrev = useCallback(
		(e: any) => {
			e.stopPropagation();
			const length = venue.media?.length ?? 0;
			setCurrentImageIndex((prev) => (prev - 1 + length) % length);
		},
		[venue.media]
	);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", (e) => {
			if (e.key === "ArrowRight") imageNext(e);
			if (e.key === "ArrowLeft") imagePrev(e);
		});
		return () => {
			document.body.style.overflow = "auto";
			window.removeEventListener("keydown", () => {});
		};
	}, [imageNext, imagePrev]);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.5 }}
			className="fixed left-0 top-0 z-50 flex h-full max-h-screen w-screen justify-center bg-black bg-opacity-90"
			onClick={close}
		>
			<button
				onClick={close}
				className="absolute left-0 right-0 top-2 z-30 mx-auto flex w-fit items-center gap-2 rounded border bg-white bg-opacity-80 px-4 py-2 font-bold"
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
						d="M6 18 18 6M6 6l12 12"
					/>
				</svg>
				Close
			</button>
			{venue.media && (
				<div className="relative m-auto h-fit max-h-screen overflow-scroll rounded bg-white">
					<button
						className={`group absolute left-0 top-0 h-full bg-gray-100 bg-opacity-30 p-5 ${transition}`}
						onClick={imagePrev}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={3.5}
							stroke="currentColor"
							className="h-8 w-8 group-hover:scale-110"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 19.5 8.25 12l7.5-7.5"
							/>
						</svg>
					</button>
					<button
						onClick={imageNext}
						className={`group absolute right-0 top-0 h-full bg-gray-100 bg-opacity-30 p-5 ${transition}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={3.5}
							stroke="currentColor"
							className="h-8 w-8 group-hover:scale-110"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m8.25 4.5 7.5 7.5-7.5 7.5"
							/>
						</svg>
					</button>
					<Image
						src={venue.media[currentImageIndex].url}
						alt={venue.media[currentImageIndex].alt}
						width={800}
						height={800}
						className="max-h-screen rounded border-8 border-white object-contain"
					/>
					<p className="bg-white p-2 text-center">
						{venue.media[currentImageIndex].alt}
					</p>
				</div>
			)}
		</motion.div>
	);
}
