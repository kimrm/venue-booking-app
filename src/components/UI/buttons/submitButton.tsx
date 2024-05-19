"use client";
import { useFormStatus } from "react-dom";
import { transition } from "./transitions";

export default function SubmitButton({
	children,
}: {
	children?: React.ReactNode;
}) {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className={`rounded-xl ${pending && " animate-pulse"} bg-yellow-400 px-4 py-2 hover:bg-yellow-300 ${transition}`}
		>
			{pending ? "submitting..." : children}
		</button>
	);
}
