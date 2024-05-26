"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import UserProfile from "@/types/UserProfile";
import { UserContext } from "@/context/UserContext";

interface Props {
	profile: UserProfile;
	avatarChanged: (avatar?: string) => void;
}

export default function Avatar({ profile, avatarChanged }: Props) {
	const [modalOpen, setModalOpen] = useState(false);
	const [previewAvatar, setPreviewAvatar] = useState(
		profile?.avatar?.url ?? ""
	);
	const [avatarUrl, setAvatarUrl] = useState(profile?.avatar?.url ?? "");
	const [imageLoading, setImageLoading] = useState(false);
	const [avatar, setAvatar] = useState(profile?.avatar?.url ?? "");
	const { setProfile } = useContext(UserContext) || {};

	useEffect(() => {
		if (modalOpen) {
			document.body.style.overflow = "hidden";
			setAvatarUrl(profile?.avatar?.url ?? "");
			setPreviewAvatar(profile?.avatar?.url ?? "");
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [setAvatarUrl, profile, modalOpen]);

	function handleAvatarUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAvatarUrl(e.target.value);
	}

	function handleAvatarUrlBlur() {
		if (avatarUrl !== previewAvatar) setImageLoading(true);
		setPreviewAvatar(avatarUrl);
	}

	function updateAvatar() {
		if (setProfile) {
			setProfile((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					avatar: { url: avatarUrl, alt: `${prev.name}s avatar` },
				};
			});
		}
		avatarChanged(avatarUrl);
		setAvatar(avatarUrl);
		setModalOpen(false);
	}

	return (
		<>
			<Image
				src={avatar}
				alt={profile?.avatar?.alt ?? ""}
				width={200}
				height={200}
				className="rounded-3xl"
			/>

			<button
				onClick={() => setModalOpen((prev) => !prev)}
				className="my-5 rounded-lg bg-yellow-500 px-4 py-2 hover:bg-yellow-600"
			>
				Change avatar
			</button>
			{modalOpen && (
				<div className="fixed left-0 top-0 flex h-screen w-screen items-center bg-black bg-opacity-80 p-2">
					<div className="mx-auto w-full rounded-3xl bg-offwhite px-6 py-4 lg:w-1/2">
						<h2 className="text-xl font-bold">Edit avatar</h2>
						<p className="my-3 max-w-prose">Add a new avatar image.</p>
						<form onSubmit={updateAvatar}>
							<div className="my-3">
								<label htmlFor="url" className="mb-3">
									Image url
								</label>
								<input
									id="url"
									type="url"
									placeholder="Image URL"
									value={avatarUrl ?? ""}
									onChange={handleAvatarUrlChange}
									onBlur={handleAvatarUrlBlur}
									className="w-full rounded border p-2"
								/>
							</div>
							<div className="relative w-fit overflow-clip">
								{!imageLoading && (
									<div className="absolute left-0 top-0 rounded-tl bg-yellow-500 px-5">
										Preview
									</div>
								)}
								{imageLoading && (
									<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
										<div className="mx-auto rounded bg-white p-2">
											Loading new image...
										</div>
									</div>
								)}
								<Image
									src={previewAvatar ?? ""}
									alt="Preview"
									width={200}
									height={200}
									className="rounded-3xl"
									onLoad={() => setImageLoading(false)}
								/>
							</div>
							<div className="my-5 flex items-center gap-3">
								<button
									type="submit"
									className="rounded-lg bg-yellow-500 px-4 py-2 hover:bg-yellow-600"
								>
									Save avatar
								</button>
								<button
									className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow-950 hover:bg-yellow-200"
									onClick={() => setModalOpen((prev) => !prev)}
								>
									Close
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
}
