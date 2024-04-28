"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../context/UserContext";
import UserProfile from "@/types/UserProfile";

export default function ProfilePage() {
	const [bio, setBio] = useState<string>("");
	const { profile, setProfile } =
		useContext<UserContextType | undefined>(UserContext) || {};

	useEffect(() => {
		if (profile) {
			setBio(profile.bio || "");
		}
	}, [profile]);

	function handleBioChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setBio(e.target.value);
	}

	function updateProfile() {
		if (setProfile) {
			setProfile((prev: UserProfile | undefined) => {
				if (!prev) return;
				return { ...prev, bio: bio };
			});
		}
	}
	return (
		<div className="w-full">
			<h2 className="mb-3 text-xl font-bold">Edit bio</h2>
			<div className="w-full rounded-lg border p-2 md:w-2/3">
				<textarea
					rows={12}
					cols={24}
					className="w-full"
					value={bio}
					onChange={handleBioChange}
					onBlur={updateProfile}
				></textarea>
			</div>
		</div>
	);
}
