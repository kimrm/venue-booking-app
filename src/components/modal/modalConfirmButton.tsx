import React from "react";

export default function ModalConfirmButton({
	onClick,
}: {
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="rounded-lg bg-red-500 px-4 py-2 text-white"
		>
			Confirm
		</button>
	);
}
