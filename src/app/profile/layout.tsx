"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../context/UserContext";
import { usePostFetch } from "@/hooks/api";
import { boolean } from "yup";
import { log } from "console";

interface Props {
	children: React.ReactNode;
}
export default function Layout({ children }: Props) {
	const { profile } =
		useContext<UserContextType | undefined>(UserContext) || {};
	const pathname = usePathname();
	const [postData, setPostData] = useState<{} | null>(null);
	const { data, loading, error } = usePostFetch("/api/logout", postData);

	useEffect(() => {
		if (!data) return;
		const logoutData: { status: string } = data;
		if (logoutData.status === "ok") {
			window.location.href = "/";
		}
	}, [data]);

	function handleLogoutClick() {
		setPostData({});
	}

	if (!profile) {
		return (
			<div>
				<h2>Please log in to view this site.</h2>
			</div>
		);
	}
	return (
		<div className="flex">
			<aside className="mr-10 h-fit w-48 rounded-xl bg-gray-50">
				<ul className="py-2">
					<li
						className={`mb-2 ${
							pathname === "/profile" &&
							"border-y border-gray-100 bg-offwhite font-bold"
						} p-4`}
					>
						<Link
							className="block text-gray-600 hover:text-black"
							href="/profile"
						>
							Bio
						</Link>
					</li>
					<li
						className={`mb-2 ${
							pathname === "/profile/avatar" &&
							"border-y border-gray-100 bg-offwhite font-bold"
						} p-4`}
					>
						<Link
							className="block text-gray-600 hover:text-black"
							href="/profile/avatar"
						>
							Avatar
						</Link>
					</li>
					<li
						className={`mb-2 ${
							pathname === "/profile/banner" &&
							"border-y border-gray-100 bg-offwhite font-bold"
						} p-4`}
					>
						<Link
							className="block text-gray-600 hover:text-black"
							href="/profile/banner"
						>
							Banner
						</Link>
					</li>
					{!profile.venueManager && (
						<li
							className={`mb-2 ${
								pathname === "/profile/venue/register" &&
								"border-y border-gray-100 bg-offwhite font-bold"
							} p-4`}
						>
							<Link
								className="block text-gray-600 hover:text-black"
								href="/profile/venue/register"
							>
								Register Venue
							</Link>
						</li>
					)}
					<li className="mb-2 p-4">
						<button
							onClick={handleLogoutClick}
							className="block text-gray-600 hover:text-black"
						>
							Log out
						</button>
					</li>
				</ul>
			</aside>
			<div className="w-full">
				<h1 className="mb-10 text-3xl">{profile?.name}</h1>
				<div>{children}</div>
			</div>
		</div>
	);
}
