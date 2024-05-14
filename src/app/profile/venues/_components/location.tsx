"use client";
import { useState } from "react";
import MapboxMap from "./mapboxMap";

interface Location {
	latitude: number;
	longitude: number;
}

export default function Location() {
	const [location, setLocation] = useState<Location>({
		latitude: 0,
		longitude: 0,
	});
	return (
		<div>
			<MapboxMap setLocation={setLocation} />
		</div>
	);
}
