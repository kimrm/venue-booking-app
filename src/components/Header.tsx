import React from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { profile, setProfile } = useContext(UserContext) || {};

  async function logoutClickHandler() {
    const response = await fetch("/api/logout", {
      method: "POST",
    });
    if (response.ok) {
      if (setProfile) {
        setProfile(undefined);
      }
    } else {
      throw new Error("Failed to log out");
    }
  }
  return (
    <header className="py-6">
      <nav className="flex gap-10 justify-between items-center">
        <div className=" w-full flex gap-10 items-center">
          <Link
            className="font-serif font-bold tracking-wide text-2xl"
            href="/"
          >
            Holidation
          </Link>
          <button
            title="Search for your next holiday"
            className="flex gap-3 items-center py-2 text-gray-500 px-3 rounded-lg border border-offwhite2 hover:border-orange-400 transition-all duration-500 bg-gradient-to-r from-white to-offwhite w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span className="text-xs md:hidden">Search</span>
            <span className="text-xs hidden md:block">
              Find your next holiday
            </span>
          </button>
        </div>
        <button className="block lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <ul className="hidden lg:flex gap-7 justify-center h-full items-center">
          <li className="bg-offwhite rounded-md p-2">
            <Link
              href="/"
              className=" hover:text-orange-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          {!profile && (
            <>
              <li>
                <Link
                  href="/register"
                  className=" hover:text-orange-400 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className=" hover:text-orange-400 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  </svg>
                  Register
                </Link>
              </li>
            </>
          )}
          {profile?.venueManager ? (
            <li>
              <Link
                href="/admin"
                className=" hover:text-orange-400 transition-colors duration-300"
              >
                Manage Venues
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href="/profile/venue/register"
                className=" hover:text-orange-400 transition-colors duration-300 block whitespace-nowrap"
              >
                Add your venue
              </Link>
            </li>
          )}
          {profile && (
            <li>
              <Link
                href="/profile"
                className=" bg-gray-50 flex flex-col justify-center relative"
              >
                <div className="max-w-7xl mx-auto">
                  <div className="relative group cursor-pointer">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-white ring-1 ring-gray-900/5 rounded-full leading-none flex items-top justify-start space-x-6">
                      <div className="space-y-2">
                        <Image
                          src={profile?.avatar?.url ?? "/placeholder.jpg"}
                          alt={profile?.avatar?.alt ?? "placeholder"}
                          width={100}
                          height={100}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
