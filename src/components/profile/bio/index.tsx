"use client";

import { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function Bio({
	bioText,
	bioChanged,
}: {
	bioText?: string;
	bioChanged?: (bio?: string) => void;
}) {
	const [bio, setBio] = useState(bioText);
	const { setProfile } = useContext(UserContext) || {};

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setBio(e.target.value);
	}

	function submitChange() {
		if (setProfile) {
			setProfile((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					bio: bio,
				};
			});
		}
		bioChanged && bioChanged(bio);
	}
	return (
		<>
			<div className="w-full rounded-lg border bg-white p-2 md:w-2/3">
				<textarea
					rows={5}
					cols={24}
					className="w-full"
					value={bio}
					onChange={handleChange}
					onBlur={submitChange}
				></textarea>
			</div>
		</>
	);
}
