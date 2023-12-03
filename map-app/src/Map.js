// src/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ pins }) => {
  const center = [40.7128, -74.0060]; // Coordinates for New York City
  console.log('Pins:', pins);

  const bounds = [
    [40.477399, -74.259090], // Southwest coordinates
    [40.917577, -73.700272]  // Northeast coordinates
  ];
  

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }} 
    maxBounds={bounds} maxBoundsViscosity={1.0} minZoom = {12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((pin) => (
        pin.location && (
          <Marker key={pin._id} position={pin.location.coordinates}>
            <Popup>{pin.caption}</Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default Map;
