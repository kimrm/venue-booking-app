import React from "react";

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="z-10 mt-5 flex w-screen flex-col justify-center bg-gray-900 p-4">
			<p className="my-10 text-center font-serif text-lg text-gray-50">
				At Holidation, we believe in the power of travel to change the world.
			</p>
			<p className="text-center text-sm text-gray-50">
				&copy; {year} Holidation. All rights reserved.
			</p>
		</footer>
	);
}
