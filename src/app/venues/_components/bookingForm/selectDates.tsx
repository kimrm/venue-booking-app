import DateRangeSelector from "./dateRangeSelector";
import Venue from "@/types/Venue";

export default function SelectDates({
	handleDatesSelected,
	venue,
}: {
	handleDatesSelected: (dates: (Date | null)[]) => void;
	venue: Venue;
}) {
	return (
		<div className="my-3">
			<DateRangeSelector
				excludeDateIntervals={venue.bookings?.map((booking) => ({
					start: new Date(booking?.dateFrom),
					end: new Date(booking?.dateTo),
				}))}
				datesSelected={handleDatesSelected}
			/>
		</div>
	);
}
