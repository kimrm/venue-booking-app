import { useEffect, useState } from "react";
import fetcher from "@/utils/fetcher";

export function usePostFetch(url: string, postData: any) {
	const [error, setError] = useState<{ code: string; message: string } | null>(
		null
	);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (!postData) return;
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetcher(
					url,
					postData ? "POST" : "GET",
					postData ?? null
				);

				if (!response.ok) {
					setError({
						code: response.statusCode.toString(),
						message: response.status,
					});
					setLoading(false);
					return { error: "Failed to fetch data" };
				}
				const data = await response.json();
				console.log("hook: ", data);
				setData(data);
			} catch (err: any) {
				setError({
					code: "500",
					message: err.message,
				});
			}
		};
		fetchData();
	}, [url, postData]);

	return { error, loading, data };
}
