"use client";
import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "../css/date-picker.css";

interface Props {
	dateRangeSelected: (startDate: Date | null, endDate: Date | null) => void;
}

export default function BookVenue({ dateRangeSelected }: Props) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const onChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		dateRangeSelected(start, end);
	};
	const ExampleCustomInput = forwardRef<
		HTMLButtonElement,
		{ onClick?: () => void }
	>(({ onClick }, ref) => {
		return (
			<button
				className="rounded-xl bg-yellow-300 p-2 hover:bg-yellow-400"
				onClick={onClick}
				ref={ref}
			>
				Check availability
			</button>
		);
	});
	return (
		<DatePicker
			startDate={startDate}
			endDate={endDate}
			onChange={onChange}
			selectsRange
			withPortal
			customInput={<ExampleCustomInput />}
			excludeDateIntervals={[
				{ start: new Date(2024, 3, 1), end: new Date(2024, 3, 10) },
				{ start: new Date(2024, 3, 15), end: new Date(2024, 3, 20) },
			]}
			placeholderText="Select a date range"
		/>
	);
}
