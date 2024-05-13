"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { UiContext } from "../../context/UiContext";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./menu";
import router from "next/router";

export default function Header() {
	const { setSearchModalOpen } = useContext(UiContext) || {};
	const { profile } = useContext(UserContext) || {};
	const searchParams = useSearchParams();
	const [toastVisible, setToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState<string | null>("");
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (searchParams?.get("toast")) {
			const toast = searchParams.get("toast");
			switch (toast) {
				case "logout-successful":
					setToastMessage("You have been logged out");
					break;
				case "login-successful":
					setToastMessage("You have been logged in");
					break;
				default:
					break;
			}
		}
	}, [searchParams]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (toastMessage !== "") {
			setToastVisible(true);
			timeout = setTimeout(() => {
				setToastVisible(false);
				setToastMessage("");
				window.history.replaceState({}, "", "/");
			}, 5000);
		}
		return () => clearTimeout(timeout);
	}, [toastMessage, toastVisible]);

	function searchClickHandler() {
		if (setSearchModalOpen) {
			setSearchModalOpen(true);
		}
	}

	return (
		<header className="container mx-auto px-4 py-6 md:px-0">
			<AnimatePresence>
				{menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
			</AnimatePresence>
			<AnimatePresence>
				{toastVisible && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="fixed right-2 top-2 z-50 rounded border-l-4 border-l-green-500 bg-gray-300 p-2 font-bold text-gray-950"
					>
						{toastMessage}
					</motion.div>
				)}
			</AnimatePresence>
			<nav className="flex items-center justify-between gap-10">
				<div className=" flex w-full items-center gap-10">
					<Link
						className="font-serif text-2xl font-bold tracking-wide"
						href="/"
					>
						Holidation
					</Link>
					<button
						onClick={searchClickHandler}
						title="Search for your next holiday"
						className="flex w-full items-center gap-3 rounded-lg border border-white bg-gradient-to-r from-yellow-50 to-offwhite px-3 py-2 text-gray-500 transition-all duration-500 hover:border-orange-400"
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
				<button
					className="block p-2 lg:hidden"
					title="Open menu"
					onClick={() => setMenuOpen(true)}
				>
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
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
				<ul className="hidden h-full items-center justify-center gap-7 lg:flex">
					<li className="rounded-md bg-gray-900 p-2 text-gray-50">
						<Link
							href="/"
							className=" transition-colors duration-300 hover:text-orange-400"
						>
							Home
						</Link>
					</li>
					{profile ? (
						profile?.venueManager ? (
							<li>
								<Link
									href="/admin"
									className="block whitespace-nowrap  transition-colors duration-300 hover:text-orange-400"
								>
									Manage Venues
								</Link>
							</li>
						) : (
							<li>
								<Link
									href="/profile/venue/register"
									className="block whitespace-nowrap transition-colors duration-300 hover:text-orange-400"
								>
									Add your venue
								</Link>
							</li>
						)
					) : (
						<>
							<li>
								<Link
									href="/login"
									className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-gray-50 p-2 transition-colors duration-300 hover:text-orange-400"
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
						</>
					)}

					{profile && (
						<li>
							<Link
								href="/profile"
								className=" relative flex flex-col justify-center bg-gray-50"
							>
								<div className="mx-auto max-w-7xl">
									<div className="group relative cursor-pointer">
										<div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-600 opacity-25 blur transition duration-1000 hover:shadow-sm group-hover:opacity-100 group-hover:duration-200"></div>
										<div className="items-top relative flex h-10 w-10 justify-start space-x-6 overflow-hidden rounded-full bg-white leading-none ring-1 ring-gray-900/5">
											<Image
												src={profile?.avatar?.url ?? "/placeholder.jpg"}
												alt={profile?.avatar?.alt ?? "placeholder"}
												width={100}
												height={100}
												className="h-full w-full object-cover object-center"
											/>
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
