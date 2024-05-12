export default function VerifyMessage() {
	return (
		<p className="mt-3 flex max-w-prose items-center text-yellow-600">
			<span className="mr-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-6 w-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
					/>
				</svg>
			</span>
			It looks like these dates are available. Please click &quot;Verify
			dates&quot; to confirm.
		</p>
	);
}
