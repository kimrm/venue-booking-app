"use client";
import { useFormStatus } from "react-dom";
import Link from "next/link";

const transition = "transition-all duration-300";

export function ConfirmButton({
	children,
	...rest
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<button
			className="mt-5 rounded-xl bg-green-300 px-4 py-2 transition-colors duration-300 hover:bg-green-400"
			{...rest}
		>
			{children}
		</button>
	);
}

export function SubmitButton({ children }: { children?: React.ReactNode }) {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className={`rounded-lg ${pending && " animate-pulse"} bg-yellow-500 px-4 py-2 transition-colors duration-300 hover:bg-yellow-300`}
		>
			{pending ? "submitting..." : children}
		</button>
	);
}

export function CancelButton({
	children,
	...rest
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<button
			className="rounded-lg bg-gray-200 px-4 py-2 transition-colors duration-300 hover:bg-gray-300"
			{...rest}
		>
			{children}
		</button>
	);
}

export function ActionButton({
	children,
	...rest
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<button
			{...rest}
			className={`flex items-center gap-1 rounded-lg bg-yellow-400 px-4 py-2 text-xs uppercase tracking-wide hover:bg-yellow-300 ${transition}`}
		>
			{children}
		</button>
	);
}

export function LinkButton({
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

export function ButtonSvg({ children }: { children?: React.ReactNode }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="inline h-4 w-4"
		>
			{children}
		</svg>
	);
}
