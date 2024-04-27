"use client";

import { useState, useEffect } from "react";

interface ToggleProps {
	onText: string;
	offText: string;
	onChange?: (isToggledOn: boolean) => void;
}

export default function Toggle({ onText, offText, onChange }: ToggleProps) {
	const [isToggledOn, setIsToggledOn] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		onChange?.(isToggledOn);
	}, [isToggledOn, onChange]);

	return (
		<>
			<label
				className={`${isFocused && "ring-2 ring-yellow-200"} relative flex h-8 w-32 cursor-pointer justify-between rounded-full bg-gray-200 `}
				title="Toggle this"
				content="Toggle"
				htmlFor="toggle"
			>
				<div
					className={`absolute ${isToggledOn ? "translate-x-0  bg-yellow-100" : "translate-x-full bg-red-100"} top-0 flex h-8 w-1/2 items-center justify-center  rounded-full border border-gray-300 text-xs font-bold uppercase tracking-wide delay-150 duration-500 ease-in-out`}
				>
					{isToggledOn ? onText : offText}
				</div>
				<input
					className="absolute h-8 w-8 cursor-pointer rounded-full opacity-0"
					type="checkbox"
					name="toggle"
					id="toggle"
					onChange={() => setIsToggledOn(!isToggledOn)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					checked={isToggledOn}
					tabIndex={0}
				/>
			</label>
		</>
	);
}
