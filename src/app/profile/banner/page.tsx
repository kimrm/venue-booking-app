"use client";

import Image from "next/image";
import { useContext } from "react";
import { UserContext, UserContextType } from "../../../context/UserContext";

export default function Banner() {
  const { profile, setProfile } =
    useContext<UserContextType | undefined>(UserContext) || {};
  return (
    <div>
      <h2>Update your banner</h2>
      <Image
        src={profile?.banner?.url}
        alt={profile?.banner?.alt}
        width={200}
        height={200}
      />
    </div>
  );
}
