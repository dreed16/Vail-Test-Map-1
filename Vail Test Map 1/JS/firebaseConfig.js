// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDIKhn4wzUCAqyTJOpoAA5fXPTYTbKFQg",
  authDomain: "vail-test-map-final.firebaseapp.com",
  projectId: "vail-test-map-final",
  storageBucket: "vail-test-map-final.firebasestorage.app",
  messagingSenderId: "963395320979",
  appId: "1:963395320979:web:f01ae4cd0e4004a4ce166",
  measurementId: "G-ZGSM2P7Z1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
