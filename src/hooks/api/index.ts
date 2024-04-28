import { useEffect, useState } from "react";

export function usePostFetch(url: string, postData: any) {
	const [error, setError] = useState<{
		code: string;
		message: string;
		errors: { message: string }[];
	} | null>(null);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (!postData) return;
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(url, {
					method: postData ? "POST" : "GET",
					headers: {
						"Content-Type": "application/json",
					},
					body: postData ? JSON.stringify(postData) : null,
				});

				const data = await response.json();

				if (!response.ok) {
					setError({
						code: response.status.toString(),
						message: response.statusText,
						errors: data.errors || [{ message: response.statusText }],
					});
					setLoading(false);
					return { error: "Failed to fetch data" };
				}

				setData(data);
			} catch (err: any) {
				setError({
					code: "500",
					message: err.message,
					errors: [{ message: err.message }],
				});
			}
		};
		fetchData();
	}, [url, postData]);

	return { error, loading, data };
}
