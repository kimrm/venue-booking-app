import Link from "next/link";
import { transition } from "./transitions";

export default function LinkButton({
	children,
	href,
}: {
	children?: React.ReactNode;
	href: string;
}) {
	return (
		<Link
			className={`rounded-lg bg-yellow-400 px-4 py-2 text-xs uppercase tracking-wide hover:bg-yellow-300 ${transition}`}
			href={href}
		>
			{children}
		</Link>
	);
}
