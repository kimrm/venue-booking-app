import React from "react";

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="mt-20 flex w-full flex-col justify-center bg-gray-900 py-20">
			<p className="mb-10 text-center font-serif text-lg text-gray-50">
				At Holidation, we believe in the power of travel to change the world.
			</p>
			<p className="text-center text-sm text-gray-50">
				&copy; {year} Holidation. All rights reserved.
			</p>
		</footer>
	);
}
