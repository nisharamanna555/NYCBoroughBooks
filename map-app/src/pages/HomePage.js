// src/pages/HomePage.js
import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { auth } from "../components/firebase";
import { onAuthStateChanged } from 'firebase/auth';

import { getDocs, getFirestore, collection } from "firebase/firestore";
import Header from '../components/Header';
import PinForm from '../PinForm';
import Map from '../Map';

const queryData = async (app) => {
  if (!app) return [];
  const db = getFirestore(app);
  const data = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
};

function HomePage({ app, isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    if (!app) return;
    queryData(app).then(setPostData);
  }, [app]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserSignedIn(!!user);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const [pins, setPins] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const addPin = async (newPin) => {
    try {
      const response = await fetch('http://localhost:3001/pins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: {
            type: 'Point',
            coordinates: [newPin.location[0], newPin.location[1]],
          },
          caption: newPin.caption,
          photoUrl: 'URL to your photo', // You can modify this part accordingly
        }),
      });

      if (response.ok) {
        const addedPin = await response.json();
        setPins((prevPins) => [...prevPins, addedPin]);
        console.log('Pin added successfully!');
      } else {
        console.error('Failed to add pin');
      }
    } catch (error) {
      console.error('Error adding pin:', error.message);
    }
  };

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch('http://localhost:3001/pins');
        if (response.ok) {
          const pinsData = await response.json();
          setPins(pinsData);
        } else {
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
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
      <h1>New York City Cultural Preservation Map</h1>
      {isUserSignedIn ? (
        <PinForm addPin={addPin} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      ) : <></>}
      <Map pins={pins} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
    </div>
  );
}

export default HomePage;