import { getProfile } from "@/actions/profile";
import UserProfile from "@/types/UserProfile";
import Navigation from "./_components/navigation";
import LogOut from "@/components/profile/logout";
import Breadcrumbs from "./_components/breadcrumbs";

interface Props {
	children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
	const profile: UserProfile = await getProfile();

	if (!profile) {
		return (
			<div>
				<h2>Please log in to view this site.</h2>
			</div>
		);
	}
	return (
		<div className="flex">
			<div className="invisible sticky left-0 top-0 my-2 h-fit w-0 rounded-xl bg-gray-50 md:visible md:mr-24 md:min-w-52">
				<Navigation />

				<div className="my-5 w-full border-t border-gray-100 p-2">
					<LogOut />
				</div>
			</div>

			<div className="my-5 w-full md:ml-10">
				<div className="mb-3">
					<Breadcrumbs />
				</div>
				<h1 className="mb-10 text-sm uppercase tracking-widest md:mb-5">
					{profile?.name}
				</h1>
				<div>{children}</div>
			</div>
		</div>
	);
}
