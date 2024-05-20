import { forwardRef } from "react";

interface InputProps {
	children?: React.ReactNode;
	[key: string]: any;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ children, ...rest }, ref) => {
		return (
			<div className={`mb-3${rest.type === "number" ? " w-32" : " w-full"}`}>
				<label htmlFor={rest.id} className="mb-2 block">
					{rest.title}
				</label>
				<input
					ref={ref}
					className={`mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
					{...rest}
				/>
				{children}
			</div>
		);
	}
);

Input.displayName = "Input";
export default Input;
// export default function Input({
// 	children,
// 	...rest
// }: {
// 	children?: React.ReactNode;
// 	[key: string]: any;
// }) {
// 	return (
// 		<div className={`mb-3${rest.type === "number" ? " w-32" : " w-full"}`}>
// 			<label htmlFor={rest.id} className="mb-2 block">
// 				{rest.title}
// 			</label>
// 			<input
// 				className={`mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
// 				{...rest}
// 			/>
// 			{children}
// 		</div>
// 	);
// }
