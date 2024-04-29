"use client";
import React from "react";
import { Circles } from "react-loader-spinner";

export default function loading() {
	return (
		<div className="flex w-full flex-row items-center justify-center">
			<Circles
				height="80"
				width="80"
				color="#4fa94d"
				ariaLabel="circles-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
			Loading ...
		</div>
	);
}
