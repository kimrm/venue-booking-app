"use client";
import React, { useState, useRef, useCallback } from "react";
import MapGL, { Marker, ViewStateChangeEvent } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
	"pk.eyJ1Ijoia2ltcm1vIiwiYSI6ImNsdzY4eWZzaDI2a2MybHFzb2k2Ym1sb3IifQ.OrBXHf0mXYOFDIWjguTikQ";

interface Location {
	latitude: number;
	longitude: number;
}

interface MapboxMapProps {
	setLocation: (location: Location) => void;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ setLocation }) => {
	const [viewport, setViewport] = useState({
		latitude: 60.472,
		longitude: 8.4689,
		zoom: 4,
	});

	const [marker, setMarker] = useState<Location>({
		latitude: 60.472,
		longitude: 8.4689,
	});

	const mapRef = useRef(null);

	const onMapClick = useCallback(
		(event: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
			const { lng, lat } = event.lngLat;
			setMarker({ longitude: lng, latitude: lat });
			setLocation({ longitude: lng, latitude: lat });
		},
		[setLocation]
	);

	const handleViewportChange = (event: ViewStateChangeEvent) => {
		setViewport({
			latitude: event.viewState.latitude,
			longitude: event.viewState.longitude,
			zoom: event.viewState.zoom,
		});
	};

	return (
		<div className="relative h-96 w-full">
			<button className="absolute left-10 top-10 z-10 rounded-xl bg-yellow-500 p-2">
				Set location
			</button>
			<MapGL
				{...viewport}
				mapStyle="mapbox://styles/mapbox/streets-v11"
				onMove={handleViewportChange}
				mapboxAccessToken={MAPBOX_TOKEN}
				onClick={onMapClick}
				ref={mapRef}
				interactive={false}
				zoom={5}
			>
				<Marker longitude={marker.longitude} latitude={marker.latitude}>
					<div style={{ color: "red" }}>📍</div>
				</Marker>
			</MapGL>
		</div>
	);
};

export default MapboxMap;
