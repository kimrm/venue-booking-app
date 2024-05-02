export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<h1>Admin pages</h1>
			<div>{children}</div>
		</div>
	);
}
