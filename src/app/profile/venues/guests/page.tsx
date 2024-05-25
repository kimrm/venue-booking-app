import { getAllBookings } from "@/actions/bookings";
import Link from "next/link";
import Image from "next/image";

export default async function Guests() {
	const bookings = await getAllBookings();
	return (
		<div>
			<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed border-b-gray-200  pb-2 text-xs font-bold uppercase text-gray-700">
				Guests arriving
			</h2>
			<table className=" w-full table-auto rounded bg-gray-100">
				<thead className=" border-b-2 border-dashed">
					<tr>
						<th className="p-4 text-left">Guest</th>

						<th className="p-4 text-left">Arrives</th>
						<th className="w-16 max-w-20 p-4 text-right">Guests</th>
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
								<td className=" p-4 text-left">
									<div className="flex items-center gap-2">
										{booking?.customer?.avatar && (
											<div className="inline">
												<Image
													src={booking.customer.avatar.url ?? ""}
													alt={booking.customer.avatar.alt ?? ""}
													className="hidden h-6 w-6 cursor-pointer rounded-full object-cover object-center lg:block"
													width={25}
													height={25}
												/>
											</div>
										)}
										<Link
											className="text-sm uppercase tracking-wide hover:text-yellow-600"
											href={`/profile/venues/guests/${booking.id}`}
										>
											{booking.customer?.name}
										</Link>
									</div>
									<Link
										className=" mt-3 block overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-yellow-600"
										href={`/profile/venues/guests/${booking.id}`}
									>
										{booking.venue?.name}
									</Link>
								</td>

								<td className="p-4">
									{new Date(booking.dateFrom).toLocaleDateString()}
								</td>
								<td className="w-16 max-w-20 p-4 text-right">
									{booking.guests}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
