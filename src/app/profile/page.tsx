import UserProfile from "@/types/UserProfile";
import Venue from "@/types/Venue";
import { getProfile, updateProfile } from "@/actions/profile";
import { getVenuesForProfile } from "@/actions/venues";
import Bio from "@/components/profile/bio";
import Avatar from "@/components/profile/avatar";
import Link from "next/link";
import { LinkButton } from "@/components/UI/buttons";

export default async function ProfilePage() {
	const profile: UserProfile = await getProfile();
	const venues: Venue[] = await getVenuesForProfile();

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
							Your venues
						</h2>
						<div className="my-5">
							<h3 className="mb-1 mt-5 uppercase tracking-widest">
								Manage your venues
							</h3>

							{venues.length < 0 && (
								<>
									<p className="mb-3">
										Here you&apos;ll see the venues you manage.
									</p>
									<p className="mb-3 text-gray-700">No venues listed.</p>
								</>
							)}
							<table className="w-full table-auto rounded bg-gray-100">
								<thead className="border-b-2 border-dashed">
									<tr>
										<th className="p-2 text-left">Name</th>
										<th className="text-right">Rating</th>
										<th className="p-2 text-right">Bookings</th>
									</tr>
								</thead>
								<tbody>
									{venues.map((venue, index) => (
										<tr
											key={venue.id}
											className={`${index % 2 === 0 && "bg-white"}`}
										>
											<td className="p-2 text-left">
												<Link href={`/profile/venues/${venue.id}`}>
													{venue.name}
												</Link>
											</td>
											<td className="text-right">{venue.rating}</td>
											<td className="p-2 text-right">
												{venue._count?.bookings}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="mt-3 flex justify-end">
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

					<table className="w-full table-auto rounded bg-gray-100">
						<thead className="border-b-2 border-dashed">
							<tr>
								<th className="p-2 text-left">Venue</th>
								<th className="text-left">Check in</th>
								<th className="p-2 text-right">Guests</th>
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
								.map((booking, index) => (
									<tr
										key={booking.id}
										className={`${index % 2 === 0 && "bg-white"}`}
									>
										<td className="p-2 text-left">
											<Link href={`/profile/bookings/${booking.id}`}>
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
										<td className="p-2 text-right">{booking.guests}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="mt-10">
					<h3 className="mb-1 mt-5 uppercase">Previous bookings</h3>

					<table className="w-full table-auto rounded bg-gray-100">
						<thead className="border-b-2 border-dashed">
							<tr>
								<th className="p-2 text-left">Venue</th>
								<th className="p-2 text-left">Check in</th>
								<th className="p-2 text-right">Guests</th>
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
								.map((booking, index) => (
									<tr
										key={booking.id}
										className={`${index % 2 === 0 && "bg-white"}`}
									>
										<td className="p-2 text-left">
											<Link href={`/profile/bookings/${booking.id}`}>
												{booking.venue.name}
											</Link>
										</td>
										<td className="p-2">
											{new Date(booking.dateFrom).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</td>
										<td className="p-2 text-right">{booking.guests}</td>
									</tr>
								))}
						</tbody>
					</table>
					<div className="mt-3 flex justify-end">
						<LinkButton href="/profile/bookings">Manage bookings</LinkButton>
					</div>
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
