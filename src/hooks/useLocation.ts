import { useState, useEffect } from "react";

export default function useLocation() {
	const [userLocation, setUserLocation] = useState<string | null>(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setUserLocation(
					`${position.coords.latitude},${position.coords.longitude}`
				);
			});
		}
	}, []);

	return { userLocation };
}
