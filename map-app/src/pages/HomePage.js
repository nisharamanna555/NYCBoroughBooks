import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';


import { getDocs, getFirestore, collection } from "firebase/firestore";
import Header from '../components/Header';
import Post from '../components/Post'
import Map from '../Map';
import PinForm from '../PinForm';

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

function HomePage({app, isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        if(!app) return;
        queryData(app).then(setPostData);
    }, [app])

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
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
      <h1>New York City Cultural Preservation Map</h1>
      <PinForm addPin={addPin} />
      <Map pins={pins} />
    </div>
  );
}

export default HomePage;