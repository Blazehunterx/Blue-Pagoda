"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet + Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Specialty icon for Blue Pagoda
const BrandIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [15, 46],
});

interface InteractiveMapProps {
  activeSpot: any;
  hotspots: any[];
}

const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
};

const InteractiveMap = ({ activeSpot, hotspots }: InteractiveMapProps) => {
  return (
    <MapContainer 
      center={[activeSpot.lat, activeSpot.lng]} 
      zoom={14} 
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {hotspots.map((spot, i) => (
        <Marker 
          key={i} 
          position={[spot.lat, spot.lng]}
          icon={spot.name === "Blue Pagoda Kuta Bali" ? BrandIcon : DefaultIcon}
        >
          <Popup>
            <strong>{spot.name}</strong><br/>
            {spot.type}
          </Popup>
        </Marker>
      ))}
      <RecenterMap lat={activeSpot.lat} lng={activeSpot.lng} />
    </MapContainer>
  );
};

export default InteractiveMap;
