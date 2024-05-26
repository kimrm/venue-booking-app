"use client";
import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function Navigation() {
	const pathname = usePathname();
	const { profile } = useContext(UserContext) || {};

	return (
		<ul className="py-2">
			<li className="p-4 text-xs font-bold uppercase">Account</li>
			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile#bio" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
					href="/profile#bio"
				>
					Profile
				</Link>
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/bookings" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
					href="/profile/bookings"
				>
					Bookings
				</Link>
			</li>
			{profile?.venueManager && (
				<li className={`mb-2 p-4`}>
					<Link
						className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/venues" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
						href="/profile/venues"
					>
						Venues
					</Link>
					{pathname.includes("/profile/venues") && (
						<ul className="mt-5">
							<li className={`mb-4 px-4`}>
								<Link
									className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/venues/register" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
									href="/profile/venues/register"
								>
									Register a venue
								</Link>
							</li>
							<li className={`px-4`}>
								<Link
									className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/venues/bookings" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
									href="/profile/venues/guests"
								>
									Guests
								</Link>
							</li>
						</ul>
					)}
				</li>
			)}

			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile#bio" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
					href="/profile#bio"
				>
					Bio
				</Link>
			</li>
			<li className={`mb-2 p-4`}>
				<Link
					className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile#avatar" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
					href="/profile#avatar"
				>
					Avatar
				</Link>
			</li>
			{!profile?.venueManager && (
				<li className="mb-2 p-4">
					<Link
						className={`mx-1 block whitespace-nowrap rounded outline-offset-4 outline-yellow-400 ${pathname === "/profile/become-venue-manager" ? "text-gray-950" : "text-gray-600"} hover:text-black`}
						href="/profile/become-venue-manager"
					>
						Add a Venue
					</Link>
				</li>
			)}
		</ul>
	);
}
