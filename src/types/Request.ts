export type NoroffAPIRequest = {
	method: string;
	headers?: {
		"Content-Type"?: string;
		"X-Noroff-API-Key"?: string;
		Authorization?: string;
	};
	body?: string;
};
