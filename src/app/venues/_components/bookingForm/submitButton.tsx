import { useFormStatus } from "react-dom";

export default function SubmitButton({
	pendingText,
	defaultText,
	disabled,
}: {
	pendingText: string;
	defaultText: string;
	disabled?: boolean;
}) {
	const { pending } = useFormStatus();
	return (
		<button
			disabled={disabled}
			className="mt-4 rounded-lg bg-yellow-300 px-4 py-2 font-bold text-yellow-950 hover:bg-yellow-400 disabled:text-gray-500"
		>
			{pending ? pendingText : defaultText}
		</button>
	);
}
