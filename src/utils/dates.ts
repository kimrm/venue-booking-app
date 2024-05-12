export function getDayName(date: Date | null) {
	if (!date) return "";
	const days = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
	return days[date.getDay()];
}
