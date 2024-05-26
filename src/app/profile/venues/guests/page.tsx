import { getAllBookings } from "@/actions/bookings";
import { getProfile } from "@/actions/profile";
import UserProfile from "@/types/UserProfile";
import Link from "next/link";

export default async function Guests() {
	const profile: UserProfile = await getProfile();
	const bookings = await getAllBookings();

	if (!profile.venueManager) {
		return (
			<span className="text-red-500">
				You are not registered as a venue mananger!
			</span>
		);
	}

	return (
		<div>
			<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed border-b-gray-200  pb-2 text-xs font-bold uppercase text-gray-700">
				Next guests arriving
			</h2>
			<table className=" table w-full rounded bg-gray-100">
				<thead className=" border-b-2 border-dashed">
					<tr>
						<th className="p-4 text-left">Guest</th>
						<th className="p-4 text-left">Arrives</th>
						<th className="hidden w-16 max-w-20 p-4 text-right sm:block">
							Guests
						</th>
					</tr>
				</thead>
				<tbody>
					{bookings
						?.filter((booking) => new Date(booking.dateFrom) > new Date())
						.sort(
							(a, b) =>
								new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
						)
						.map((booking, index) => (
							<tr
								key={booking.id}
								className={`${index % 2 === 0 && "bg-white"}`}
							>
								<td className="p-2 text-left">
									<Link
										className="text-sm uppercase tracking-wide hover:text-yellow-600"
										href={`/profile/venues/guests/${booking.id}`}
									>
										{booking.customer?.name}
									</Link>
									<Link
										className=" mt-3 block overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-yellow-600"
										href={`/profile/venues/guests/${booking.id}`}
									>
										{booking.venue?.name}
									</Link>
								</td>

								<td className="p-2 align-top">
									{new Date(booking.dateFrom).toLocaleDateString()}
								</td>
								<td className="hidden w-16 max-w-20 p-2 text-right align-top sm:block">
									{booking.guests}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
