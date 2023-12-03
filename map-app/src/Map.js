import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ pins, selectedLocation }) => {
  const center = [40.7128, -74.0060]; // Coordinates for New York City

  const handleMapClick = (e) => {
    console.log("Map clicked");
    console.log("selected location:", e.latlng);
    // Handle map click logic here
  };

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
      {pins && pins.map((pin) => (
        pin.location && pin.location.coordinates && (
          <Marker key={pin._id} position={pin.location.coordinates}>
            <Popup>{pin.caption}</Popup>
          </Marker>
        )
      ))}
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}

      {/* Use useMapEvents for handling map events */}
      <MapEvents onClick={handleMapClick} />
    </MapContainer>
  );
};

// Custom MapEvents component to handle map events
const MapEvents = ({ onClick }) => {
  const map = useMapEvents({
    click: (e) => {
      onClick(e);
    },
  });

  return null;
};

export default Map;