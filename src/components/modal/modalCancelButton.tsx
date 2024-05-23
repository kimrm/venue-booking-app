import React from "react";

export default function ModalCancelButton({
	onClick,
}: {
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="rounded-lg bg-gray-500 px-4 py-2 text-white"
		>
			Cancel
		</button>
	);
}
