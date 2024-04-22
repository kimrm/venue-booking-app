"use client";

import UserProvider from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

interface UserProfile {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt: string;
  };
  banner?: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
  logins: number;
}

interface Props {
  children?: React.ReactNode;
  userProfile?: UserProfile;
}

export default function Layout({ children, userProfile }: Props) {
  return (
    <UserProvider initialData={userProfile}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </UserProvider>
  );
}
