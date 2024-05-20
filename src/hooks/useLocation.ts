import { useState } from "react";

export default function useLocation() {
	const [userLocation, setUserLocation] = useState<any>({
		lat: 0,
		lng: 0,
	});

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setUserLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}

	return { userLocation, getLocation };
}
