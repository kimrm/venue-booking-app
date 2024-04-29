"use client";
import Image from "next/image";
import { useState } from "react";

interface Props {
	priority?: boolean;
	src: string;
	alt: string;
	imageClassName?: string;
	width?: number;
	height?: number;
	errorIcon?: boolean;
}

export default function ImageLoader({
	priority,
	src,
	alt,
	imageClassName,
	width = 300,
	height = 300,
	errorIcon = true,
}: Props) {
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleError = () => {
		setHasError(true);
		setLoading(false);
	};

	const handleLoaded = () => {
		setLoading(false);
	};

	return (
		<>
			<div className={`relative`}>
				<div
					className={`absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-lg bg-gray-300 text-gray-300 transition-all duration-0 ${
						loading ? "z-0 animate-pulse opacity-100" : "z-10 opacity-0"
					}`}
				></div>
				{hasError && (
					<div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center gap-3 rounded-lg bg-gray-300 text-gray-900 transition-all duration-0">
						{errorIcon && (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="z-20 h-12 w-12"
									aria-label="Image failed to load"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
									/>
								</svg>

								<p>Image failed to load</p>
							</>
						)}
					</div>
				)}

				<Image
					priority={priority}
					onError={handleError}
					onLoad={handleLoaded}
					src={src}
					alt={alt}
					width={width}
					height={height}
					className={imageClassName}
				/>
			</div>
		</>
	);
}
