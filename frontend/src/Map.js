import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import gem from './images/gem.png';
import gemShadow from './images/gemShadow.png';

import history from './images/history.png';
import historyShadow from './images/historyShadow.png';

import story from './images/story.png';
import storyShadow from './images/storyShadow.png';

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

  const bounds = [
    [40.477399, -74.259090], // Southwest coordinates
    [40.917577, -73.700272]  // Northeast coordinates
  ];
  
  var myIcon =L.Icon.extend({
    options: {
    iconSize:     [38, 38],
    shadowSize:   [38, 38],
    iconAnchor:   [19, 38],
    shadowAnchor: [19, 38],
    popupAnchor:  [0, -40]
}
});


var gemIcon = new myIcon({iconUrl: gem, shadowUrl: gemShadow}),
    historyIcon = new myIcon({iconUrl: history, shadowUrl: historyShadow}),
    storyIcon = new myIcon({iconUrl: story, shadowUrl: storyShadow});

  return (
    <MapContainer center={center} zoom={13} style={{ height: '500px', width: '100%' }} 
    maxBounds={bounds} maxBoundsViscosity={1.0} minZoom = {12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pins && pins.map((pin) => (
        pin.location && pin.location.coordinates && (
          <Marker key={pin._id} position={pin.location.coordinates} icon = {gemIcon}>
            <Popup>{pin.caption}</Popup>
          </Marker>
        )
      ))}
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]} icon = {gemIcon}>
          <Popup>Your caption will go here!</Popup>
        </Marker>
      )}
      <Marker position ={[40.7128, -74.0060]} icon = {gemIcon}>
      <Popup>
        New York City hall!
      </Popup>
    </Marker>
    <Marker position ={[40.7128, -73.9860]} icon = {storyIcon}>
      <Popup>
      Ew! I saw a rat here. Be careful, make sure to wear long pants.
      </Popup>
    </Marker>
    <Marker position ={[40.7328, -74.0060]} icon = {historyIcon}>
      <Popup>
      
        This is on Christopher Street. There were riots here in 1969.
      </Popup>
    </Marker>
    
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
