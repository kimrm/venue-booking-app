import Venue from "./Venue";

interface Booking {
	id: string;
	dateFrom: string;
	dateTo: string;
	guests: number;
	created?: string;
	updated?: string;
	venue?: Venue;
	customer?: {
		name: string;
		email: string;
		avatar?: {
			url: string;
			alt: string;
		};
	};
}

export default Booking;
