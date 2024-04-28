"use client";
import Image from "next/image";
import { useState } from "react";
import { Hearts } from "react-loader-spinner";

interface Props {
	priority?: boolean;
	url: string;
	description: string;
	className?: string;
	imageClassName?: string;
	width?: number;
	height?: number;
}

export default function ImageLoader({
	priority,
	url,
	description,
	className,
	imageClassName,
	width = 300,
	height = 300,
}: Props) {
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(true);

	const handleError = () => {
		setHasError(true);
	};

	const handleLoaded = () => {
		setLoading(false);
	};

	return (
		<>
			{" "}
			{loading && (
				<Hearts
					height="80"
					width="80"
					color="#4fa94d"
					ariaLabel="hearts-loading"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			)}
			<div className={`relative overflow-hidden`}>
				<div
					className={`absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-lg bg-gray-200 text-gray-300 transition-all duration-500 ${
						!loading && "z-0 translate-x-full opacity-0"
					}`}
				>
					{hasError && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-12 w-12"
							aria-label="Image failed to load"
						>
							<path
								fillRule="evenodd"
								d="m6.72 5.66 11.62 11.62A8.25 8.25 0 0 0 6.72 5.66Zm10.56 12.68L5.66 6.72a8.25 8.25 0 0 0 11.62 11.62ZM5.105 5.106c3.807-3.808 9.98-3.808 13.788 0 3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788Z"
								clipRule="evenodd"
							/>
						</svg>
					)}
				</div>

				<Image
					priority={priority}
					onError={handleError}
					onLoad={handleLoaded}
					src={url}
					alt={description}
					width={width}
					height={height}
					className={`h-48 w-full rounded-lg object-cover ${className}`}
				/>
			</div>
		</>
	);
}
