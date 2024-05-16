import { transition } from "./transitions";

export default function CancelButton({
	children,
	...rest
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<button
			className={`rounded-lg bg-gray-200 px-4 py-2 transition-colors duration-300 hover:bg-gray-300 ${transition}`}
			{...rest}
		>
			{children}
		</button>
	);
}
