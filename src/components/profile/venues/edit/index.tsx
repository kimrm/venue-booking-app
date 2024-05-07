"use client";
import Image from "next/image";
import Venue from "@/types/Venue";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { update } from "@/actions/venues";
import { useFormStatus, useFormState } from "react-dom";

interface Props {
	venue: Venue;
}

const initialState = {
	status: "",
	data: {},
};

export default function Edit({ venue }: Props) {
	const [appendImages, setAppendImages] = useState<
		{ url: string; alt: string }[]
	>([]);
	const [appendImageModalOpen, setAppendImageModalOpen] = useState(false);
	const [newImageUrl, setNewImageUrl] = useState("");
	const [newImageAlt, setNewImageAlt] = useState("");
	const [state, formAction] = useFormState(update, initialState);
	const { pending } = useFormStatus();
	const [toastVisible, setToastVisible] = useState(false);

	function handleNewImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewImageUrl(e.target.value);
	}

	function handleNewImageAltChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewImageAlt(e.target.value);
	}

	function handleImageAdd() {
		setAppendImages([...appendImages, { url: newImageUrl, alt: newImageAlt }]);
		setAppendImageModalOpen(false);
		setNewImageUrl("");
		setNewImageAlt("");
	}

	useEffect(() => {
		console.log(pending);
	}, [pending]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (state?.status === "ok") {
			console.log(state.data);
			setToastVisible(true);
			timeout = setTimeout(() => {
				setToastVisible(false);
			}, 5000);
		}
		return () => clearTimeout(timeout);
	}, [state]);

	return (
		<>
			<AnimatePresence>
				{toastVisible && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="fixed right-2 top-2 z-50 border-l-4 border-l-green-500 bg-gray-300 p-2 font-bold text-gray-950"
					>
						Venue updated!
					</motion.div>
				)}
			</AnimatePresence>
			<form action={formAction} className="mt-10">
				{appendImageModalOpen && (
					<div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center bg-black bg-opacity-80 p-2">
						<motion.div
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							className="mx-auto rounded-3xl bg-offwhite px-6 py-4"
						>
							<h2 className="text-xl font-bold">Add Image</h2>
							<input
								type="url"
								placeholder="Image URL"
								value={newImageUrl}
								onChange={handleNewImageChange}
							/>
							<input
								type="text"
								placeholder="Alt text"
								value={newImageAlt}
								onChange={handleNewImageAltChange}
							/>
							<Image
								src={newImageUrl}
								alt={newImageAlt}
								width={100}
								height={100}
							/>
							<button onClick={handleImageAdd}>Add image </button>
						</motion.div>
					</div>
				)}

				<h2 className="mb-5 text-xl font-bold">Edit venue</h2>
				<div className="mb-5">
					<label
						htmlFor="name"
						className="block text-sm uppercase tracking-wide"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						className="w-full rounded border border-gray-300 p-2"
						defaultValue={venue?.name}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="description"
						className="block text-sm uppercase tracking-wide"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						className="w-full rounded border border-gray-300 p-2"
						defaultValue={venue?.description}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="price"
						className="block text-sm uppercase tracking-wide"
					>
						Price per Day
					</label>
					<input
						type="text"
						id="price"
						name="price"
						className="w-full rounded border border-gray-300 p-2"
						defaultValue={venue?.price}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="maxGuests"
						className="block text-sm uppercase tracking-wide"
					>
						Max guests
					</label>
					<input
						type="text"
						id="maxGuests"
						name="maxGuests"
						className="w-full rounded border border-gray-300 p-2"
						defaultValue={venue?.maxGuests}
					/>
				</div>
				<div className="mb-5">
					<span className="block text-sm uppercase tracking-wide">
						Accommodations
					</span>
					<div className="flex gap-5">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="wifi"
								id="wifi"
								content="Wifi"
								defaultChecked={venue?.meta?.wifi}
								value="on"
							/>
							<label htmlFor="wifi">Wifi</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="parking"
								id="parking"
								content="Parking"
								defaultChecked={venue?.meta?.parking}
								value="on"
							/>
							<label htmlFor="parking">Parking</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="pets"
								id="pets"
								content="Pets"
								defaultChecked={venue?.meta?.pets}
								value="on"
							/>
							<label htmlFor="pets">Pets</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								name="breakfast"
								id="breakfast"
								content="Breakfast"
								defaultChecked={venue?.meta?.breakfast}
								value="on"
							/>
							<label htmlFor="breakfast">Breakfast</label>
						</div>
					</div>
				</div>
				<div className="mb-5">
					<span className="block text-sm uppercase tracking-wide">Images</span>
					<div className="flex flex-wrap gap-5">
						{venue?.media?.map(
							(media: { id?: number; url?: string; alt?: string }) => (
								<Image
									key={media.url}
									src={media.url ?? ""}
									alt={media.alt ?? ""}
									width={100}
									height={100}
									className="h-52 w-52 rounded-lg"
								/>
							)
						)}
						{appendImages.map((image, index) => (
							<Image
								key={index}
								src={image.url}
								alt={image.alt}
								width={100}
								height={100}
								className="rounded-lg"
							/>
						))}

						<div>
							<button
								type="button"
								className="rounded bg-blue-500 px-4 py-2 text-white"
								onClick={() => setAppendImageModalOpen(true)}
							>
								Add image
							</button>
						</div>
					</div>
				</div>
				<div>
					<SaveButton />
				</div>
				<input
					type="hidden"
					name="media"
					value={JSON.stringify(venue?.media?.concat(appendImages))}
				/>
				<input type="hidden" name="id" value={venue?.id} />
			</form>
		</>
	);
}

function SaveButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className={`rounded ${pending ? "bg-gray-600 text-gray-100" : "bg-blue-500 text-white"} px-4 py-2`}
			disabled={pending}
		>
			{pending ? "Saving..." : "Save"}
		</button>
	);
}
