interface Venue {
	id?: string;
	name: string;
	description: string;
	media?: {
		id?: string;
		url: string;
		alt: string;
	}[];
	price: number;
	maxGuests: number;
	rating: number;
	created?: string;
	updated?: string;
	meta: {
		wifi?: boolean;
		parking?: boolean;
		breakfast?: boolean;
		pets?: boolean;
	};
	location: {
		address?: string;
		city?: string;
		zip?: string;
		country?: string;
		continent?: string;
		lat?: number;
		lng?: number;
	};
	owner?: {
		name: string;
		email: string;
		avatar?: {
			url: string;
			alt: string;
		};
	};
	bookings?: [
		{
			id: string;
			dateFrom: string;
			dateTo: string;
			guests: number;
			created: string;
			updated: string;
			customer?: {
				name: string;
				email: string;
				avatar?: {
					url: string;
					alt: string;
				};
			};
		},
	];
	_count?: {
		bookings?: number;
	};
}

export default Venue;
