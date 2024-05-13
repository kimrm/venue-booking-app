"use client";

import { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserContext } from "@/context/UserContext";
import LogOut from "@/components/profile/logout";

export default function Menu({ closeMenu }: { closeMenu: () => void }) {
	const { profile } = useContext(UserContext) || {};
	return (
		<motion.div
			initial={{ x: -100 }}
			animate={{ x: 0 }}
			role="navigation"
			className="fixed left-0 top-0 z-50 h-screen w-full bg-white px-7 py-7 shadow-md"
		>
			<button onClick={closeMenu} className="absolute right-7 top-7">
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
						d="M6 18 18 6M6 6l12 12"
					/>
				</svg>
			</button>
			<div className="container mx-auto h-full items-center justify-between">
				<Link className="font-serif text-2xl font-bold tracking-wide" href="/">
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
							<li>
								<LogOut />
							</li>
						)}
						{!profile && (
							<li>
								<Link href="/login" onClick={closeMenu}>
									Login
								</Link>
							</li>
						)}
						{!profile && (
							<li>
								<Link href="/signup" onClick={closeMenu}>
									Register
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</motion.div>
	);
}
