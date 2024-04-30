import React from "react";

export default function VenueItemSkeleton() {
	return (
		<div className=" h-full min-h-screen w-full bg-white">
			<div className="w-full">
				<div className="h-48 w-full animate-pulse rounded-lg bg-gray-300 object-cover lg:h-96">
					{" "}
				</div>

				<div className="grid w-full lg:grid-cols-3">
					<div className="lg:col-span-2">
						<div className="my-4 h-12 animate-pulse rounded-lg bg-gray-200">
							{" "}
						</div>

						<div className="mb-5 h-4 animate-pulse rounded bg-gray-200 p-2"></div>
						<div className="my-4 h-2 animate-pulse rounded-lg bg-gray-200">
							{" "}
						</div>
						<div>
							<div className="my-10 flex items-center gap-5">
								<div className=" flex h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
								<div className="my-4 h-4 w-1/4 animate-pulse rounded-lg bg-gray-200">
									{" "}
								</div>
							</div>
						</div>
					</div>
					<div className="mt-5 w-full lg:mt-0 lg:p-4 lg:py-0 ">
						<div className="grid w-full gap-5 lg:grid-cols-2">
							<div className="my-4 h-40 w-full animate-pulse rounded-lg bg-gray-200">
								{" "}
							</div>
							<div className="my-4 h-40 w-full animate-pulse rounded-lg bg-gray-200">
								{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
