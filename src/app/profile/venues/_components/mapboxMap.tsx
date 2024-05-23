"use client";
import { getContinentByCountry } from "@/utils/locale";
import React, { useState, useRef, useCallback } from "react";
import MapGL, { Marker, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_KEY;

interface Location {
	latitude: number;
	longitude: number;
}

interface MapboxMapProps {
	location: Location;
	setLocation: (location: Location) => void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ location, setLocation }) => {
	const [viewport, setViewport] = useState({
		latitude: location.latitude || 60.472,
		longitude: location.longitude || 8.4689,
		zoom: 12,
	});

	const [marker, setMarker] = useState<Location>({
		latitude: location.latitude || 60.472,
		longitude: location.longitude || 8.4689,
	});

	const [mapStyle, setMapStyle] = useState(
		"mapbox://styles/mapbox/satellite-streets-v11"
	);

	const mapRef = useRef(null);

	const handleViewportChange = (event: ViewStateChangeEvent) => {
		setViewport({
			latitude: event.viewState.latitude,
			longitude: event.viewState.longitude,
			zoom: event.viewState.zoom,
		});
	};

	const toggleMapStyle = () => {
		setMapStyle((prevStyle) =>
			prevStyle === "mapbox://styles/mapbox/streets-v11"
				? "mapbox://styles/mapbox/satellite-streets-v11"
				: "mapbox://styles/mapbox/streets-v11"
		);
	};

	const onMapClick = useCallback(
		(event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
			const { lng, lat } = event.lngLat;
			setMarker({ longitude: lng, latitude: lat });
			setLocation({ longitude: lng, latitude: lat });
		},
		[setLocation]
	);

	return (
		<div className="relative h-full w-full">
			<MapGL
				{...viewport}
				mapStyle={mapStyle}
				onMove={handleViewportChange}
				mapboxAccessToken={MAPBOX_TOKEN}
				onClick={onMapClick}
				ref={mapRef}
			>
				<Marker longitude={marker.longitude} latitude={marker.latitude}>
					<div style={{ color: "red" }}>📍</div>
				</Marker>
			</MapGL>
			<button
				type="button"
				className="absolute right-2 top-2 rounded-xl bg-white bg-opacity-50 px-4 py-2 shadow-md"
				onClick={toggleMapStyle}
			>
				Toggle{" "}
				{mapStyle === "mapbox://styles/mapbox/streets-v11"
					? "Satellite"
					: "Street"}{" "}
				View
			</button>
		</div>
	);
};

export default MapboxMap;
