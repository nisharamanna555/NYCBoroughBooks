// src/PinForm.js
import React, { useState } from 'react';
import Map from './Map';

//Styles and components
import './CreatePin.css';

const PinForm = ({ addPin }) => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a location is selected
    if (!selectedLocation) {
      alert('Please select a location on the map');
      return;
    }

    // TODO: Implement photo upload logic (e.g., using FormData)

    const newPin = {
      caption,
      // photo: URL to the uploaded photo
      location: [selectedLocation.lat, selectedLocation.lng], // Get the selected location from the map
    };

    // Call the addPin function to send the new pin to the backend
    addPin(newPin);
  };
  // Callback function to receive selected location from the map
  const handleMapClick = (e) => {
    setSelectedLocation({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
    });
  };

  return (
    <form className="pin-form" onSubmit={handleSubmit}>
      <label>
        Caption:
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </label>
      <label>
        Photo:
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      </label>
      {/* TODO: Add a map component for location selection */}
      {/* <Map onClick={handleMapClick} selectedLocation={selectedLocation} /> */}

      <button type="submit">Add Pin</button>
    </form>
  );
};

export default PinForm;
