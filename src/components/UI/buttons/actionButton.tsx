import { transition } from "./transitions";

export default function ActionButton({
	children,
	...rest
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<button
			{...rest}
			className={`flex items-center gap-1 rounded-lg bg-yellow-400 px-4 py-2 text-xs uppercase tracking-wide hover:bg-yellow-300 disabled:animate-pulse disabled:bg-yellow-200 disabled:text-yellow-600 ${transition}`}
		>
			{children}
		</button>
	);
}
