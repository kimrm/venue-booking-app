import { useState, useEffect } from "react";

interface LoginData {
	email: string;
	password: string;
}

export function useLogin(loginData: LoginData | null) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(null);

	useEffect(() => {
		if (loginData?.email && loginData?.password) {
			login(loginData.email, loginData.password).then((data) => {
				setData(data);
			});
		}
	}, [loginData]);

	async function login(email: string, password: string) {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/login", {
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
			return data;
		} catch (err) {
			console.error(err);
		}
	}

	return { error, loading, data };
}
