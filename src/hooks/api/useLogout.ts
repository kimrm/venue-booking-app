import { useState } from "react";

export function useLogout() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

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
			setData(data);
		} catch (err) {
			console.error(err);
		}
	}

	return { error, loading, data, logout };
}
