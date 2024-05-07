import UserProfile from "@/types/UserProfile";
import { getProfile, updateProfile } from "@/actions/profile";
import Bio from "@/components/profile/bio";
import Avatar from "@/components/profile/avatar";
import Link from "next/link";

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
			<section id="bookings" className="mt-10">
				<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed  border-b-gray-200 pb-2 font-bold uppercase text-gray-700">
					My venues
				</h2>
				<div className="my-5">
					<h3 className="mb-3 mt-5 uppercase tracking-widest">
						Manage your venues
					</h3>
					<p className="mb-3">Here you&apos;ll see the venues you manage.</p>
					<p className="mb-3 text-gray-700">No venues listed.</p>
					<div className="flex">
						<Link
							href="/profile/venues"
							className="block w-full whitespace-nowrap  rounded bg-yellow-500 px-4 py-2 text-gray-800 transition-colors duration-500 hover:bg-yellow-400 hover:text-black md:w-fit"
						>
							Manage venues
						</Link>
					</div>
				</div>
			</section>
			<section id="bookings" className="my-20">
				<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed  border-b-gray-200 pb-2 font-bold uppercase text-gray-700">
					Bookings
				</h2>
				<div className="my-5">
					<h3 className="mb-3 mt-5 uppercase tracking-widest">
						Upcoming bookings
					</h3>
					<p className="mb-3">
						Here you&apos;ll see the last bookings you&apos;ve made.{" "}
					</p>
					<p className="mb-3 text-gray-700">No upcoming bookings.</p>
				</div>
			</section>
			<section id="profile" className="my-20">
				<h2 className="mb-3 border-spacing-2 border-spacing-y-24 border-b border-dashed  border-b-gray-200 pb-2 font-bold uppercase text-gray-700">
					Edit your profile
				</h2>
				<div id="bio" className="my-5">
					<h3 className="mb-3 mt-5 uppercase tracking-widest">Bio</h3>
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
