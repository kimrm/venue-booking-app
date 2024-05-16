"use client";
import { FormEvent, FormEventHandler, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import VenueRegisterData from "@/types/VenueRegisterData";

export default function AddImageModal({
	onSave,
	onClose,
}: {
	onSave: Function;
	onClose: Function;
}) {
	const [url, setUrl] = useState("");
	const [alt, setAlt] = useState("");
	const [imagePreview, setImagePreview] = useState("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSave({ url, alt });
	};
	return (
		<div className="absolute left-0 top-0 z-30 flex h-screen w-full items-center bg-black bg-opacity-80 px-2 py-5">
			<motion.div
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				className="mx-auto w-full max-w-full rounded-3xl bg-offwhite px-4 py-4 "
			>
				<h2 className="text-xl font-bold">Add image</h2>
				<p className="my-3 max-w-prose">
					Add the url to the image and a caption.
				</p>
				<form onSubmit={handleSubmit}>
					<div className="my-3">
						<label htmlFor="url" className="mb-3">
							Image url
						</label>
						<input
							id="url"
							type="url"
							placeholder="https:://example.com/image.jpg"
							className="w-full rounded border p-2"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							onBlur={() => setImagePreview(url)}
						/>
					</div>
					<div className="my-3">
						<label htmlFor="alt" className="mb-3">
							Image caption
						</label>
						<input
							id="alt"
							type="alt"
							placeholder="Wonderful lake view"
							className="w-full rounded border p-2"
							value={alt}
							onChange={(e) => setAlt(e.target.value)}
						/>
					</div>
					<div className="h-52 w-fit overflow-clip">
						{imagePreview == "" ? (
							<div className="inset-0 flex h-52 w-52 items-center justify-center rounded bg-gray-200">
								No image preview
							</div>
						) : (
							<Image
								src={imagePreview}
								alt="Preview"
								width={200}
								height={200}
								className="h-52 w-auto rounded object-cover"
							/>
						)}
					</div>
					<div className="my-5 flex items-center gap-3">
						<button
							type="submit"
							className="rounded-lg bg-yellow-500 px-4 py-2 hover:bg-yellow-600"
						>
							Add image
						</button>
						<button
							type="button"
							onClick={() => onClose()}
							className="rounded-lg bg-gray-200 px-4 py-2 transition-colors duration-300 hover:bg-gray-300"
						>
							Cancel
						</button>
					</div>
				</form>
			</motion.div>
		</div>
	);
}
