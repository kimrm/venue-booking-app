const fetcher = async (url: string, method?: string, postData?: any) =>
	fetch(url, {
		method: method || "GET",
		headers: {
			"Content-Type": "application/json",
		},
		body: postData ? JSON.stringify(postData) : null,
	}).then((res) => res.json());

export default fetcher;
