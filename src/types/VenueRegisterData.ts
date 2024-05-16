interface VenueRegisterData {
	name?: string;
	description?: string;
	price?: number;
	maxGuests?: number;
	media?: {
		id?: string;
		url: string;
		alt: string;
	}[];
	wifi?: boolean;
	parking?: boolean;
	pets?: boolean;
	breakfast?: boolean;
	address?: string;
	city?: string;
	zip?: string;
	country?: string;
	continent?: string;
	lat?: number;
	lng?: number;
}

export default VenueRegisterData;
