import React from "react";

export default function ModalHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<h2 className="text-sm font-bold uppercase tracking-wide">{children}</h2>
	);
}
