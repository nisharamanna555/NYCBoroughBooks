import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import {auth} from "./components/firebase";
//Styles and components
import './styles/App.css';
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUser';
import LoginPage from './pages/Login';
import UserOverview from './pages/UserOverview';

// Your web app's Firebase configuration
  
function App() {
  // const [appInitialized, setAppInitialized] = useState();
  const [appInitialized] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInformation, setUserInformation] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      if(user) {
        //user is signed in, see docs for a list of available properties
        setUserInformation(user);
        setIsLoggedIn(true);
      }
      else {
        //user is signed out
        setUserInformation({});
        setIsLoggedIn(false);
      }
      //whenever state changes setLoading to false
      setIsLoading(false);
    })
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomePage 
          app={appInitialized}
          isLoading={isLoading} 
          isLoggedIn={isLoggedIn}
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation}
         />
      ),
    },
    { 
      path: "/user/:id",
      element: (
        <UserOverview 
          app={appInitialized}
          isLoading={isLoading} 
          isLoggedIn={isLoggedIn} 
          userInformation={userInformation}
          setIsLoggedIn={setIsLoggedIn} 
          setUserInformation={setUserInformation}
         />
      ),
    },
    {
        path: "/login",
        element: (
          <LoginPage 
            isLoading={isLoading} 
            isLoggedIn={isLoggedIn}
            userInformation={userInformation}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation}
          />
        ),//prop isLogged in tells us if false, go to login or create, if true, go to user profile
    },
    {
        path: "/create-user",
        element: (
          <CreateUserPage 
            isLoading={isLoading}
            isLoggedIn={isLoggedIn}
            userInformation={userInformation}
            setIsLoggedIn={setIsLoggedIn} 
            setUserInformation={setUserInformation} />
        ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} basename="/" />
    </div>
  );
}

export default App;