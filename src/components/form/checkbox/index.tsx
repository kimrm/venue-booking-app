import React from "react";

export default function CheckBox({
	children,
	...rest
}: {
	children?: React.ReactNode;
	[key: string]: any;
}) {
	return (
		<div className="mb-3 flex gap-2">
			<label htmlFor={rest.id} className="mb-2 block">
				{rest.title}
			</label>
			<input
				type="checkbox"
				className={`mb-2 rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300`}
				{...rest}
			/>
			{children}
		</div>
	);
}
