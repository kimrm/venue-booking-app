export type NoroffAPIRequest = {
	method: string;
	headers?: {
		"Content-Type"?: string;
		"X-Noroff-API-Key"?: string;
		Authorization?: string;
	};
	body?: string;
};

export type ProfileRequestBody = {
	bio?: string;
	avatar?: {
		url: string;
		alt: string;
	};
	banner?: {
		url: string;
		alt: string;
	};
	venueManager?: boolean;
};

export type VenueRequest = {
	name: string;
	description: string;
	media?: {
		url: string;
		alt: string;
	}[];
	price: number;
	maxGuests: number;
	rating: number;
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
};
