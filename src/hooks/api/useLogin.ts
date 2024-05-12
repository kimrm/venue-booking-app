import { useState } from "react";

export function useLogin() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	async function login(email: string, password: string) {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/account/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			if (!response.ok) {
				setError("Login failed");
				setLoading(false);
				return { error: "Login failed" };
			}
			const data = await response.json();
			setData(data);
		} catch (err) {
			console.error(err);
		}
	}

	return { error, loading, data, login };
}
