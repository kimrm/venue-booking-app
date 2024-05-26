import React from "react";

export default function ModalCancelButton({
	onClick,
}: {
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow-950 hover:bg-yellow-200"
		>
			Cancel
		</button>
	);
}
