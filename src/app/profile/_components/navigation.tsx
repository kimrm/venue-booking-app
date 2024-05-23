"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const pathname = usePathname();
	console.log(pathname);
	return (
		<ul className="py-2">
			<li className="p-4 text-xs font-bold uppercase">Account</li>
			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/bookings" ? "text-gray-950 outline" : "text-gray-600"} hover:text-black`}
					href="/profile/bookings"
				>
					Bookings
				</Link>
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/venues" ? "text-gray-950 outline" : "text-gray-600"} hover:text-black`}
					href="/profile/venues"
				>
					Venues
				</Link>
				{pathname.includes("/profile/venues") && (
					<ul className="mt-4">
						<li className={`mb-2 px-4`}>
							<Link
								className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/venues/register" ? "text-gray-950 outline" : "text-gray-600"} hover:text-black`}
								href="/profile/venues/register"
							>
								Register a venue
							</Link>
						</li>
						<li className={`mb-2 px-4`}>
							<Link
								className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/venues/register" ? "text-gray-950 outline" : "text-gray-600"} hover:text-black`}
								href="/profile/venues/register"
							>
								Venue bookings
							</Link>
						</li>
					</ul>
				)}
			</li>

			<li className="whitespace-nowrap p-4 text-xs font-bold uppercase">
				Edit profile
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile#bio" ? "text-gray-950 outline" : "text-gray-600"} hover:text-black`}
					href="/profile#bio"
				>
					Bio
				</Link>
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile#avatar" ? "text-gray-950 outline" : "text-gray-600"} hover:text-black`}
					href="/profile#avatar"
				>
					Avatar
				</Link>
			</li>
		</ul>
	);
}
