"use client";

import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/api/useLogout";

export default function LogOut({ onLogout }: { onLogout?: () => void }) {
	const [logoutData, setLogoutData] = useState({ logout: false });
	const { data, error, loading } = useLogout(logoutData);

	function handleLogoutFormSubmit() {
		onLogout && onLogout();
		setLogoutData({ logout: true });
	}

	useEffect(() => {
		if (data) {
			window.location.href = "/?toast=logout-successful";
		}
	}, [data]);

	return (
		<form onSubmit={handleLogoutFormSubmit}>
			<input type="hidden" name="logout" value="true" />
			<button
				type="submit"
				className="block w-full  whitespace-nowrap rounded bg-red-300 px-4 py-2 text-gray-600 hover:bg-red-400 hover:text-black"
			>
				{loading ? "Logging out..." : "Log out"}
			</button>
		</form>
	);
}
