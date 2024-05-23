import UserProfile from "@/types/UserProfile";
import { getProfile, updateProfile } from "@/actions/profile";
import Bio from "@/components/profile/bio";
import Avatar from "@/components/profile/avatar";
import Link from "next/link";
import { LinkButton } from "@/components/UI/buttons";

export default async function ProfilePage() {
	const profile: UserProfile = await getProfile();

	async function handleBioChange(bio?: string) {
		"use server";
		if (bio) await updateProfile({ ...profile, bio });
	}

	async function handleAvatarChanged(avatar?: string) {
		"use server";
		if (avatar)
			await updateProfile({
				...profile,
				avatar: { url: avatar, alt: `${profile.name}s avatar` },
			});
	}

	return (
		<div className="w-full">
			<section id="venues" className="my-10">
				{profile.venueManager && (
					<>
						<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed border-b-gray-200  pb-2 text-xs font-bold uppercase text-gray-700">
							My venues
						</h2>
						<div className="my-5">
							<h3 className="mb-1 mt-5 uppercase tracking-widest">
								Manage your venues
							</h3>
							<p className="mb-3">
								Here you&apos;ll see the venues you manage.
							</p>
							<p className="mb-3 text-gray-700">No venues listed.</p>
							<div className="flex justify-end">
								<LinkButton href="/profile/venues">Manage venues</LinkButton>
							</div>
						</div>
					</>
				)}
			</section>
			<section id="bookings" className="my-10">
				<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed border-b-gray-200  pb-2 text-xs font-bold uppercase text-gray-700">
					Bookings
				</h2>
				<div className="my-5">
					<h3 className="mb-1 mt-5 uppercase tracking-widest">
						Upcoming bookings
					</h3>

					<table className="w-full table-auto">
						<thead className="border-b-2 border-dashed">
							<tr>
								<th className="py-2 text-left">Venue</th>
								<th className="text-left">Check in</th>
								<th className="text-left">Guests</th>
							</tr>
						</thead>
						<tbody>
							{profile.bookings
								?.filter((booking) => new Date(booking.dateFrom) > new Date())
								.sort(
									(a, b) =>
										new Date(a.dateFrom).getTime() -
										new Date(b.dateFrom).getTime()
								)
								.map((booking) => (
									<tr key={booking.id}>
										<td className="py-2 text-left">
											<Link href={`/venues/${booking.venue.id}`}>
												{booking.venue.name}
											</Link>
										</td>
										<td>
											{new Date(booking.dateFrom).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</td>
										<td>{booking.guests}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="mt-10">
					<h3 className="mb-1 mt-5 uppercase">Previous bookings</h3>

					<table className="w-full table-auto">
						<thead className="border-b-2 border-dashed">
							<tr>
								<th className="py-2 text-left">Venue</th>
								<th className="text-left">Check in</th>
								<th className="text-left">Guests</th>
								<th className="text-center">Rate</th>
							</tr>
						</thead>
						<tbody>
							{profile.bookings
								?.filter((booking) => new Date(booking.dateFrom) < new Date())
								.sort(
									(a, b) =>
										new Date(a.dateFrom).getTime() -
										new Date(b.dateFrom).getTime()
								)
								.map((booking) => (
									<tr key={booking.id}>
										<td className="py-2 text-left">
											<Link href={`/venues/${booking.venue.id}`}>
												{booking.venue.name}
											</Link>
										</td>
										<td>
											{new Date(booking.dateFrom).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</td>
										<td>{booking.guests}</td>
										<td>
											<button className="w-full transition-transform hover:scale-110">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="mx-auto h-6 w-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
													/>
												</svg>
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</section>

			<section id="profile" className="my-10">
				<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed border-b-gray-200  pb-2 text-xs font-bold uppercase text-gray-700">
					Edit your profile
				</h2>
				<div id="bio" className="my-5">
					<h3 className="mb-3 mt-5 uppercase">Bio</h3>
					<p className="mb-3">Tell people a little bit about yourself.</p>
					<Bio bioText={profile?.bio} bioChanged={handleBioChange} />
				</div>
				<div id="avatar" className="my-5">
					<h3 className="mb-3 mt-5 uppercase tracking-widest">
						Your profile picture
					</h3>
					<p className="mb-3">Show your best smile</p>
					<Avatar profile={profile} avatarChanged={handleAvatarChanged} />
				</div>
			</section>
		</div>
	);
}
