import { NoroffAPIRequest } from "@/types/Request";

const fetcher = async (
	url: string,
	method?: string,
	postData?: any,
	ApiKey?: string,
	token?: string
) =>
	fetch(url, <NoroffAPIRequest>{
		method: method || "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Noroff-API-Key": ApiKey ?? "",
			Authorization: token ? `Bearer ${token}` : "",
		},
		body: postData ? JSON.stringify(postData) : null,
	}).then((res) => res.json());

export default fetcher;
