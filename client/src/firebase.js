// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7aec5.firebaseapp.com",
  projectId: "mern-estate-7aec5",
  storageBucket: "mern-estate-7aec5.appspot.com",
  messagingSenderId: "497335138075",
  appId: "1:497335138075:web:895807558843c6759d05be"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);