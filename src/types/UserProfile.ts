interface UserProfile {
	name: string;
	email: string;
	bio?: string;
	avatar?: {
		url: string;
		alt: string;
	};
	banner?: {
		url: string;
		alt: string;
	};
	venueManager: boolean;
	logins: number;
	bookings?: [
		{
			id: string;
			dateFrom: string;
			dateTo: string;
			guests: number;
			created: string;
			venue: {
				id: string;
				name: string;
				price: number;
			};
		},
	];
}

export default UserProfile;
