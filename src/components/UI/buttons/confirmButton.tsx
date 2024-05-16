import { transition } from "./transitions";

export default function ConfirmButton({
	children,
	...rest
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<button
			className={`mt-5 rounded-xl bg-green-300 px-4 py-2 hover:bg-green-400 ${transition}`}
			{...rest}
		>
			{children}
		</button>
	);
}
