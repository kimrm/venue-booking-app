"use client";
import Image from "next/image";
import VenueRegisterData from "@/types/VenueRegisterData";
import AddImageModal from "./addImageModal";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function AddImages({
	registerData,
	setRegisterData,
}: {
	registerData?: VenueRegisterData;
	setRegisterData: Function;
}) {
	const [showModal, setShowModal] = useState(false);

	const handleModalSave = (img: { url: string; alt: string }) => {
		console.log(img);
		setRegisterData((prev: VenueRegisterData) => {
			return {
				...prev,
				media: [
					...(prev?.media ?? []),
					{
						url: img.url,
						alt: img.alt,
					},
				],
			};
		});
		setShowModal(false);
	};

	const removeImage = (url: string) => {
		setRegisterData((prev: VenueRegisterData) => {
			return {
				...prev,
				media: prev?.media?.filter((media) => media.url !== url),
			};
		});
	};

	return (
		<div className="flex min-h-52 flex-wrap">
			{showModal && (
				<AddImageModal
					onClose={() => setShowModal(false)}
					onSave={handleModalSave}
				/>
			)}
			<AnimatePresence>
				{registerData?.media?.map((media) => {
					return (
						<motion.div
							key={media.url}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ x: -100, opacity: 0 }}
							className="relative m-2 flex w-52  flex-col items-center justify-center rounded border-2 border-white bg-slate-100 py-5"
						>
							<button
								className="absolute right-0 top-0 rounded-full bg-gray-50 p-1 text-red-500"
								onClick={() => removeImage(media.url)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="h-4 w-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</button>

							<Image
								src={media.url}
								alt={media.alt}
								width={300}
								height={300}
								className=" max-h-44 rounded object-cover"
							/>
							<div className="mt-3 text-xs font-bold uppercase tracking-wider text-gray-900">
								{media.alt}
							</div>
						</motion.div>
					);
				})}
			</AnimatePresence>
			<div className="flex items-center justify-center">
				<button
					aria-label="Add image"
					onClick={() => setShowModal(true)}
					className={`flex items-center justify-center ${registerData?.media?.length === 0 ? "rounded-xl" : "rounded-full"} border border-gray-900 px-4 py-2 text-sm uppercase tracking-wide text-gray-950 transition-all duration-300 hover:bg-gray-50 hover:shadow`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="inline h-4 w-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 4.5v15m7.5-7.5h-15"
						/>
					</svg>
					{registerData?.media?.length == 0 && "Add image"}
				</button>
			</div>
		</div>
	);
}
