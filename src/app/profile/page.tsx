"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../context/UserContext";
import UserProfile from "@/app/types/UserProfile";

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
      <h2 className="text-xl font-bold mb-3">Edit bio</h2>
      <div className="border rounded-lg p-2 w-full md:w-2/3">
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
