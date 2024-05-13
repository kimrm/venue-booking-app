"use client";

import { useEffect, useState } from "react";
import { useLogout } from "@/hooks/api/useLogout";

export default function LogOut() {
	const { data, error, loading, logout } = useLogout();

	function handleLogoutFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		logout();
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
				disabled={loading}
				className="block w-full whitespace-nowrap rounded bg-red-100 px-4 py-2 font-bold text-red-900 hover:bg-red-200 hover:text-red-800"
			>
				{loading ? "Signing out" : "Log out"}
			</button>
		</form>
	);
}
