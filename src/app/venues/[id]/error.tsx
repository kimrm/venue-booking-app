"use client";

export default function error({ error }: any) {
	return <div>error: {error.message}</div>;
}
