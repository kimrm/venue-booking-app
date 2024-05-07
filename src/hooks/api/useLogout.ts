import { useState, useEffect } from "react";

interface LogoutData {
	logout: boolean;
}

export function useLogout(logoutData: LogoutData | null) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (logoutData?.logout) {
			logout().then((data) => {
				setData(data);
			});
		}
	}, [logoutData]);

	async function logout() {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/account/logout", {
				method: "POST",
			});
			if (!response.ok) {
				setError("Logout failed");
				setLoading(false);
				return { error: "Logout failed" };
			}
			const data = await response.json();
			return data;
		} catch (err) {
			console.error(err);
		}
	}

	return { error, loading, data };
}
