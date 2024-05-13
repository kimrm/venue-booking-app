"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserContext } from "@/context/UserContext";
import LogOut from "@/components/profile/logout";
import router from "next/router";

export default function Menu({ closeMenu }: { closeMenu: () => void }) {
	const { profile } = useContext(UserContext) || {};

	useEffect(() => {
		document.body.classList.add("noscroll");

		return () => {
			document.body.classList.remove("noscroll");
		};
	}, []);

	return (
		<motion.div
			initial={{ x: -100 }}
			animate={{ x: 0 }}
			role="navigation"
			className="fixed left-0 top-0 z-50 h-screen w-full bg-gray-900 px-7 py-7 text-gray-100 shadow-md"
		>
			<button onClick={closeMenu} className="absolute right-4 top-6 p-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-8 w-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18 18 6M6 6l12 12"
					/>
				</svg>
			</button>
			<div className="container mx-auto h-full items-center justify-between">
				<Link
					className="font-serif text-2xl font-bold tracking-wide"
					href="/"
					onClick={closeMenu}
				>
					Holidation
				</Link>
				<div className=" my-24 text-2xl">
					<ul className="flex flex-col gap-4">
						<li className="font-bold">
							<Link href="/" onClick={closeMenu}>
								Home
							</Link>
						</li>
						{profile && (
							<li>
								<Link href="/profile/bookings" onClick={closeMenu}>
									Bookings
								</Link>
							</li>
						)}
						{profile && profile.venueManager && (
							<li>
								<Link href="/profile/venues" onClick={closeMenu}>
									Venues
								</Link>
							</li>
						)}
						{profile && (
							<li>
								<Link href="/profile" onClick={closeMenu}>
									Profile
								</Link>
							</li>
						)}
						{profile && (
							<li className="my-10">
								<LogOut />
							</li>
						)}
						{!profile && (
							<li>
								<Link
									href="/login"
									className="my-10 block w-full whitespace-nowrap rounded bg-yellow-400 px-4 py-2 text-center font-bold text-yellow-950"
									onClick={closeMenu}
								>
									Login
								</Link>
								<p>
									Don&apos;t have an account?{" "}
									<Link
										className="font-bold"
										href="/signup"
										onClick={closeMenu}
									>
										Sign up now
									</Link>
								</p>
							</li>
						)}
					</ul>
				</div>
			</div>
		</motion.div>
	);
}
