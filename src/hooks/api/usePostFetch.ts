import { useEffect, useState } from "react";
import fetcher from "@/utils/fetcher";

export function usePostFetch(url: string, postData: any) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (!postData) return;

		const fetchData = async () => {
			setLoading(true);
			setError("");
			try {
				const response = await fetcher(
					url,
					postData ? "POST" : "GET",
					postData ?? null
				);

				if (!response.ok) {
					setError("Failed to fetch data");
					setLoading(false);
					return { error: "Failed to fetch data" };
				}
				const data = await response.json();
				console.log(data);
				setData(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchData();
	}, [url, postData]);

	return { error, loading, data };
}
