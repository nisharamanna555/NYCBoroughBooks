// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgTczxn7zyoChEL48p2VY06fStfwkgA_g",
  authDomain: "nyuhackathon2024.firebaseapp.com",
  projectId: "nyuhackathon2024",
  storageBucket: "nyuhackathon2024.appspot.com",
  messagingSenderId: "141671987505",
  appId: "1:141671987505:web:2e78952b788eed2f229810",
  measurementId: "G-HNFKK8L56X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);