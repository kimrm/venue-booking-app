"use client";

import DatePicker from "react-datepicker";
import "@/css/date-picker.css";
import { useState, useEffect, use } from "react";

export default function DateRangeSelector({
	datesSelected,
}: {
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
			selectsRange={true}
			startDate={startDate}
			endDate={endDate}
			onChange={(update) => {
				setDateRange(update);
			}}
			withPortal
			customInput={
				<input
					type="text"
					className="w-56 rounded-xl border border-gray-200 bg-offwhite px-4 py-2 hover:bg-gray-200 focus:outline-yellow-500"
				/>
			}
		/>
	);
}
