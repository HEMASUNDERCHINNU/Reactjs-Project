// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPi5dPPYaC7ZEw4sNzxtLcIkSrs6MKaS0",
  authDomain: "e-commerce-project-9c849.firebaseapp.com",
  projectId: "e-commerce-project-9c849",
  storageBucket: "e-commerce-project-9c849.firebasestorage.app",
  messagingSenderId: "901390378355",
  appId: "1:901390378355:web:c0e3115ccbc6dbfb55d106",
  measurementId: "G-HKEM25KVR5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }