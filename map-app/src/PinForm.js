// src/PinForm.js
import React, { useState } from 'react';

const PinForm = ({ addPin }) => {
  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Implement photo upload logic (e.g., using FormData)

    const newPin = {
      caption,
      // photo: URL to the uploaded photo
      location: [/* latitude */, /* longitude */], // Get the selected location from the map
    };

    // Call the addPin function to send the new pin to the backend
    addPin(newPin);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Caption:
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </label>
      <label>
        Photo:
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      </label>
      {/* TODO: Add a map component for location selection */}
      <button type="submit">Add Pin</button>
    </form>
  );
};

export default PinForm;
