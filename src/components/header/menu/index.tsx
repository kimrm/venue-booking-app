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

		const handleRouteChange = () => {
			closeMenu();
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			router.events.off("routeChangeStart", handleRouteChange);
			document.body.classList.remove("noscroll");
		};
	}, [closeMenu]);

	return (
		<motion.div
			initial={{ x: -100 }}
			animate={{ x: 0 }}
			role="navigation"
			className="fixed left-0 top-0 z-50 h-screen w-full bg-gray-900 px-7 py-7 text-gray-100 shadow-md"
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
							<Link href="/">Home</Link>
						</li>
						{profile && (
							<li>
								<Link href="/profile/bookings">Bookings</Link>
							</li>
						)}
						{profile && profile.venueManager && (
							<li>
								<Link href="/profile/venues">Venues</Link>
							</li>
						)}
						{profile && (
							<li>
								<Link href="/profile">Profile</Link>
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
								>
									Login
								</Link>
								<p>
									Don&apos;t have an account?{" "}
									<Link className="font-bold" href="/signup">
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
