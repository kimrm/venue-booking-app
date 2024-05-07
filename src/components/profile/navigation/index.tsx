"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
	const pathname = usePathname();
	return (
		<ul className="py-2">
			<li className="p-4 text-xs font-bold uppercase">Account</li>
			<li className={`mb-2 p-4`}>
				<Link
					className="block whitespace-nowrap text-gray-600 hover:text-black"
					href="#bookings"
				>
					Bookings
				</Link>
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className="block whitespace-nowrap text-gray-600 hover:text-black"
					href="#venues"
				>
					Venues
				</Link>
			</li>
			<li className="whitespace-nowrap p-4 text-xs font-bold uppercase">
				Edit profile
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className="block whitespace-nowrap text-gray-600 hover:text-black"
					href="#bio"
				>
					Bio
				</Link>
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className="block whitespace-nowrap text-gray-600 hover:text-black"
					href="#avatar"
				>
					Avatar
				</Link>
			</li>
		</ul>
	);
}
