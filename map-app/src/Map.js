// src/Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ pins }) => {
  const center = [40.7128, -74.0060]; // Coordinates for New York City
  console.log('Pins:', pins);

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins.map((pin) => (
        <Marker key={pin._id} position={pin.location}>
          <Popup>{pin.caption}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
