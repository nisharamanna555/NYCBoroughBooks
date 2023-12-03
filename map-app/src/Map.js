import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ pins, selectedLocation, setSelectedLocation }) => {
  const center = [40.7128, -74.0060]; // Coordinates for New York City
  console.log('Received Pins:', pins);

  const handleMapClick = (e) => {
    console.log("Map clicked");
    console.log("selected location:", e.latlng);
    // Use the callback function to ensure you get the latest state
    setSelectedLocation((prevLocation) => ({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    }));
  };

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }}>
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
