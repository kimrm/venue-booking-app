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
}

export default UserProfile;
