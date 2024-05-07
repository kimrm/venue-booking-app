"use client";

import React from "react";

export default function error({ error }: any) {
	return (
		<div>
			An error occured: {error.message}
			<br />
			<br />
			Please go back and try again.
		</div>
	);
}
