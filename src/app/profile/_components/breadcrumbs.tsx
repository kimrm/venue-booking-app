"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
	const path = usePathname();
	const pathnames = path.split("/").filter((x) => x);

	function checkPathItem(pathname: string): string {
		switch (pathname) {
			case "profile":
				return "profile";
			case "bookings":
				return "bookings";
			case "venues":
				return "venues";
			case "register":
				return "register";
			case "guests":
				return "guests";
			default:
				return "...";
		}
	}

	return (
		<nav className="breadcrumb">
			<ol className="flex flex-wrap text-gray-500">
				{pathnames.map((value, index) => {
					const href = `/${pathnames.slice(0, index + 1).join("/")}`;
					const pathname = checkPathItem(value);
					const isLast = index === pathnames.length - 1;
					const isFirst = index === 0;

					return (
						<li key={index} className="flex items-center">
							{isLast ? (
								<span className="whitespace-nowrap text-gray-700">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="inline size-3"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="m8.25 4.5 7.5 7.5-7.5 7.5"
										/>
									</svg>
									{pathname}
								</span>
							) : (
								<Link href={href} className=" hover:text-gray-700">
									<span className="whitespace-nowrap">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="inline size-3"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m8.25 4.5 7.5 7.5-7.5 7.5"
											/>
										</svg>
										{pathname}
									</span>
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
