import React from "react";

export default function VenuesGridSkeleton({ items = 6 }: { items?: number }) {
	return (
		<div className="grid h-48 w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: items }).map((__, index) => {
				return (
					<div key={index} className="h-auto rounded-xl bg-offwhite p-2">
						<div className="h-48 w-full animate-pulse rounded-lg bg-gray-300"></div>
						<div>
							<div className="my-4 h-2 animate-pulse rounded-lg bg-gray-200"></div>
							<div className="my-4 h-2 animate-pulse rounded-lg bg-gray-200"></div>
							<div className="my-4 h-2 animate-pulse rounded-lg bg-gray-200"></div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
