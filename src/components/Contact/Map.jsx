"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userPos = [latitude, longitude];
        setPosition(userPos);
        map.flyTo(userPos, 15);
      },
      () => {
        console.warn("Location access denied.");
      }
    );
  }, [map]);

  return position ? (
    <Marker position={position}>
      <Tooltip>You are here</Tooltip>
    </Marker>
  ) : null;
};

const Map = () => {
  const businessLocation = [23.746935588073562, 90.39918883766512];

  return (
    <div className="w-full h-[500px] rounded-md overflow-hidden shadow-lg relative">
      {/* Optional Floating Controls */}
      <div className="absolute z-[1000] top-4 right-4 space-y-2">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${businessLocation[0]},${businessLocation[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white px-3 py-1 rounded-md shadow hover:bg-primary-dark text-sm"
        >
          Get Directions
        </a>
      </div>

      <MapContainer
        center={businessLocation}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Business Marker */}
        <Marker position={businessLocation}>
          <Tooltip>Parts Bazar</Tooltip>
        </Marker>

        {/* User's Location Marker */}
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
