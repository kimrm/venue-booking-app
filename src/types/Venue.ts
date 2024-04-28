interface Venue {
	id: string;
	name: string;
	description: string;
	media?: {
		id?: number;
		url: string;
		alt: string;
	}[];
	price: number;
	maxGuests: number;
	rating: number;
	created: string;
	updated: string;
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
		long?: number;
	};
	owner?: {
		name: string;
		email: string;
		avatar?: {
			url: string;
			alt: string;
		};
	};
}

export default Venue;
