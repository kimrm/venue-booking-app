"use client";
import React from "react";
import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../../context/UserContext";

export default function Avatar() {
  const { profile, setProfile } =
    useContext<UserContextType | undefined>(UserContext) || {};
  const [avatarSrc, setAvatarSrc] = useState(profile?.avatar?.url ?? "");

  function updateAvatarSrc(e: React.ChangeEvent<HTMLInputElement>) {
    setAvatarSrc(e.target.value);
  }

  async function updateAvatar() {}
  return (
    <div>
      <h2>Update your avatar</h2>
      <Image
        src={profile?.avatar?.url ?? ""}
        alt={profile?.avatar?.alt ?? ""}
        width={200}
        height={200}
      />

      <button>Update</button>

      <div className="flex items-center absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-80 p-2">
        <div className="mx-auto bg-offwhite rounded p-2 w-full md:w-fit">
          Modal
          <p>
            Add a new avatar image. The image should be square and at least 200.
          </p>
          <form onSubmit={updateAvatar}>
            <input
              type="url"
              placeholder="Image URL"
              value={avatarSrc}
              onChange={updateAvatarSrc}
            />
            <button>Upload</button>
            <Image src={avatarSrc} alt="Preview" width={200} height={200} />
          </form>
        </div>
      </div>
    </div>
  );
}
