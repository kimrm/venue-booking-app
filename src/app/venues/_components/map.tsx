"use client";
import { getContinentByCountry } from "@/utils/locale";
import React, { useState, useRef, useEffect } from "react";
import MapGL, { Marker, ViewStateChangeEvent, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAP_KEY;

interface Location {
	latitude: number;
	longitude: number;
}

interface MapProps {
	location: Location;
}

export default function Map({ location }: MapProps) {
	const [viewport, setViewport] = useState({
		latitude: location.latitude || 60.472,
		longitude: location.longitude || 8.4689,
		zoom: 15,
	});
	const [marker] = useState<Location>({
		latitude: location.latitude || 60.472,
		longitude: location.longitude || 8.4689,
	});
	const [mapStyle, setMapStyle] = useState(
		"mapbox://styles/mapbox/streets-v11"
	);
	const [isInteractive, setIsInteractive] = useState(false);
	const mapRef = useRef<MapRef | null>(null);

	function handleViewportChange(event: ViewStateChangeEvent) {
		setViewport({
			latitude: event.viewState.latitude,
			longitude: event.viewState.longitude,
			zoom: event.viewState.zoom,
		});
	}

	function toggleMapStyle() {
		setMapStyle((prevStyle) =>
			prevStyle === "mapbox://styles/mapbox/streets-v11"
				? "mapbox://styles/mapbox/satellite-streets-v11"
				: "mapbox://styles/mapbox/streets-v11"
		);
	}

	function onMapClick() {
		setIsInteractive(!isInteractive); // Toggle interactivity
	}

	useEffect(() => {
		const map = mapRef?.current?.getMap();

		if (!map) return;

		if (isInteractive) {
			map.boxZoom.enable();
			map.doubleClickZoom.enable();
			map.dragPan.enable();
			map.dragRotate.enable();
			map.keyboard.enable();
			map.scrollZoom.enable();
			map.touchZoomRotate.enable();
		} else {
			map.boxZoom.disable();
			map.doubleClickZoom.disable();
			map.dragPan.disable();
			map.dragRotate.disable();
			map.keyboard.disable();
			map.scrollZoom.disable();
			map.touchZoomRotate.disable();
		}
	}, [isInteractive]);

	return (
		<div className="relative h-full w-full" aria-hidden="true">
			<MapGL
				{...viewport}
				mapStyle={mapStyle}
				onMove={handleViewportChange}
				onClick={onMapClick}
				mapboxAccessToken={MAPBOX_TOKEN}
				ref={mapRef}
				interactive={isInteractive}
			>
				<Marker longitude={marker.longitude} latitude={marker.latitude}>
					<div className="text-3xl text-red-500">📍</div>
				</Marker>
			</MapGL>
			<button
				title="Toggle map style"
				className="absolute right-2 top-2 rounded-xl bg-white bg-opacity-50 px-4 py-2 shadow-md"
				onClick={toggleMapStyle}
			>
				Toggle{" "}
				{mapStyle === "mapbox://styles/mapbox/streets-v11"
					? "Satellite"
					: "Street"}{" "}
				View
			</button>
			<span className="absolute left-2 top-2 rounded-xl bg-black bg-opacity-10 px-2 py-1">
				Click map to activate
			</span>
		</div>
	);
}
