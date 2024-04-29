"use client";
export default function Loading() {
	return (
		<div>
			<div>
				<div className="h-auto w-full animate-pulse rounded-lg bg-gray-300 object-cover lg:h-96">
					{" "}
				</div>

				<div className="grid grid-cols-3">
					<div className="col-span-2">
						<div className="my-4 h-2 animate-pulse rounded-lg bg-gray-200">
							{" "}
						</div>

						<div className="mb-5 h-4 animate-pulse rounded bg-gray-200 bg-offwhite p-2"></div>
						<div className="my-4 h-2 animate-pulse rounded-lg bg-gray-200">
							{" "}
						</div>
						<div>
							<div className="my-10 flex items-center gap-5">
								<div className=" flex h-12 w-12 animate-pulse rounded-full bg-gray-200"></div>
								<div>
									<div className="my-4 h-2 animate-pulse rounded-lg bg-gray-200">
										{" "}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-10 p-4 ">
						<div className="grid grid-flow-col gap-2">
							<div className="my-4 h-40 w-40 animate-pulse rounded-lg bg-gray-200">
								{" "}
							</div>
							<div className="my-4 h-40 w-40 animate-pulse rounded-lg bg-gray-200">
								{" "}
							</div>
							<div className="my-4 h-40 w-40 animate-pulse rounded-lg bg-gray-200">
								{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
