import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
	const { profile, setProfile } = useContext(UserContext) || {};

	async function logoutClickHandler() {
		const response = await fetch("/api/logout", {
			method: "POST",
		});
		if (response.ok) {
			if (setProfile) {
				setProfile(undefined);
			}
		} else {
			throw new Error("Failed to log out");
		}
	}
	return (
		<header className="py-6">
			<nav className="flex items-center justify-between gap-10">
				<div className=" flex w-full items-center gap-10">
					<Link
						className="font-serif text-2xl font-bold tracking-wide"
						href="/"
					>
						Holidation
					</Link>
					<button
						title="Search for your next holiday"
						className="flex w-full items-center gap-3 rounded-lg border border-offwhite2 bg-gradient-to-r from-white to-offwhite px-3 py-2 text-gray-500 transition-all duration-500 hover:border-orange-400"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-6 w-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
							/>
						</svg>

						<span className="text-xs md:hidden">Search</span>
						<span className="hidden text-xs md:block">
							Find your next holiday
						</span>
					</button>
				</div>
				<button className="block lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-6 w-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
				<ul className="hidden h-full items-center justify-center gap-7 lg:flex">
					<li className="rounded-md bg-offwhite p-2">
						<Link
							href="/"
							className=" transition-colors duration-300 hover:text-orange-400"
						>
							Home
						</Link>
					</li>
					{!profile && (
						<>
							<li>
								<Link
									href="/register"
									className=" transition-colors duration-300 hover:text-orange-400"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-5 w-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
										/>
									</svg>
									Log in
								</Link>
							</li>
							<li>
								<Link
									href="/register"
									className=" transition-colors duration-300 hover:text-orange-400"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="h-6 w-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
										/>
									</svg>
									Register
								</Link>
							</li>
						</>
					)}
					{profile?.venueManager ? (
						<li>
							<Link
								href="/admin"
								className=" transition-colors duration-300 hover:text-orange-400"
							>
								Manage Venues
							</Link>
						</li>
					) : (
						<li>
							<Link
								href="/profile/venue/register"
								className=" block whitespace-nowrap transition-colors duration-300 hover:text-orange-400"
							>
								Add your venue
							</Link>
						</li>
					)}
					{profile && (
						<li>
							<Link
								href="/profile"
								className=" relative flex flex-col justify-center bg-gray-50"
							>
								<div className="mx-auto max-w-7xl">
									<div className="group relative cursor-pointer">
										<div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-600 to-violet-600 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
										<div className="items-top relative flex justify-start space-x-6 rounded-full bg-white leading-none ring-1 ring-gray-900/5">
											<div className="space-y-2">
												<Image
													src={profile?.avatar?.url ?? "/placeholder.jpg"}
													alt={profile?.avatar?.alt ?? "placeholder"}
													width={100}
													height={100}
													className="h-full w-full rounded-full object-cover"
												/>
											</div>
										</div>
									</div>
								</div>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}
