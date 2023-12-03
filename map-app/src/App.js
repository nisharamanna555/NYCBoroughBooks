// src/App.js
import React, { useState, useEffect } from 'react';
import Map from './Map';
import PinForm from './PinForm';

function App() {
  const [pins, setPins] = useState([]);

  const addPin = async (newPin) => {
    try {
      // TODO: Implement the logic to send the new pin to the backend
      const response = await fetch('http://localhost:3001/pins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPin),
      });

      if (response.ok) {
        const addedPin = await response.json();
        setPins((prevPins) => [...prevPins, addedPin]);
        console.log('Pin added successfully!');
      } else {
        // Handle error
        console.error('Failed to add pin');
      }
    } catch (error) {
        console.error('Error adding pin:', error.message);
    }
  };
  useEffect(() => {
    // Fetch existing pins from the backend
    const fetchPins = async () => {
      try {
        const response = await fetch('http://localhost:3001/pins');
        if (response.ok) {
          const pinsData = await response.json();
          setPins(pinsData);
        } else {
          // Handle error
          console.error('Failed to fetch pins');
        }
      } catch (error) {
        console.error('Error fetching pins:', error.message);
      }
    };

    fetchPins();
  }, []); // Run once on component mount

  return (
    <div className="App">
      <h1>New York City Cultural Preservation Map</h1>
      <PinForm addPin={addPin} />
      <Map pins={pins} />
    </div>
  );
}

export default App;
