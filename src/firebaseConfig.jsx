 // firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAEQrdx7JcEKPA9GQm1WTWDikoZW5OqB88",
  authDomain: "notationworks.firebaseapp.com",
  projectId: "notationworks",
  storageBucket: "notationworks.appspot.com",
  messagingSenderId: "952765621403",
  appId: "1:952765621403:web:817436cea33782c3a4d23e",
  measurementId: "G-YQJXVXVBCK"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app); // Initialize Firestore

export { app, storage, db };
