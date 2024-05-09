"use client";

import DatePicker from "react-datepicker";
import "@/css/date-picker.css";
import { useState, useEffect } from "react";

export default function DateRangeSelector({
	excludeDateIntervals = [],
	datesSelected,
}: {
	excludeDateIntervals?: Array<{ start: Date; end: Date }>;
	datesSelected: (dates: (Date | null)[]) => void;
}) {
	const [dateRange, setDateRange] = useState<Array<Date | null>>([null, null]);
	const [startDate, endDate] = dateRange;

	useEffect(() => {
		if (dateRange) {
			datesSelected(dateRange);
		}
	}, [dateRange, datesSelected]);
	return (
		<DatePicker
			excludeDateIntervals={excludeDateIntervals}
			selectsRange={true}
			startDate={startDate}
			endDate={endDate}
			onChange={(update) => {
				setDateRange(update);
			}}
			withPortal
			customInput={
				<div>
					<button
						content="Select Dates"
						title="Select Dates"
						className="w-56 rounded-xl bg-yellow-400 px-4 py-2 hover:bg-gray-200 focus:outline-yellow-500"
					>
						Select Dates
					</button>
				</div>
			}
		/>
	);
}
