import { getDayName } from "@/utils/dates";

export default function Summary({
	startDate,
	endDate,
	days,
	price,
}: {
	startDate: Date;
	endDate: Date;
	days: number;
	price: number;
}) {
	return (
		<div className="my-2">
			<div className="my-5">
				<p className="flex items-center gap-2">
					<span className="mr-3 text-xs uppercase">Duration:</span>
					<strong className="text-sm md:text-base">
						{getDayName(startDate)} {startDate?.toLocaleDateString()}
					</strong>{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-2 w-2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
					<strong className="text-sm md:text-base">
						{getDayName(endDate)} {endDate?.toLocaleDateString()}
					</strong>
				</p>
				<p>
					<span className="mr-3 text-xs uppercase">Price total:</span> $
					{days * price}
				</p>
			</div>
		</div>
	);
}
