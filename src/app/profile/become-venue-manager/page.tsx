import { getProfile } from "@/actions/profile";
import RegisterForm from "./_components/registerForm";
import UserProfile from "@/types/UserProfile";

export default async function BecomeVenueManager() {
	const profile: UserProfile = await getProfile();

	if (profile.venueManager) {
		return (
			<div>
				<h1 className="my-5 font-serif text-2xl">
					Welcome back, {profile.name}
				</h1>
				<p>It looks like you&apos;re already a venue manager.</p>
			</div>
		);
	}
	return (
		<div>
			<h1 className="my-5 font-serif text-2xl">Become a venue manager</h1>
			<p>
				Rent your house, apartment or cabin and make money when you&apos;re not
				using it.{" "}
			</p>
			<p>
				We make it easy to rent out your property to travellers from around the
				world.{" "}
			</p>
			<p>You can set your own prices, availability and house rules. </p>
			<RegisterForm />
		</div>
	);
}
