// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDIKhn4wzUcAqyTJOpoAA5fXPTYTbKF0g",
  authDomain: "vail-test-map-final.firebaseapp.com",
  projectId: "vail-test-map-final",
  storageBucket: "vail-test-map-final.firebasestorage.app",
  messagingSenderId: "963395320979",
  appId: "1:963395320979:web:f01ae4cd0e4004a4ce166",
  measurementId: "G-ZGSM2P7Z1X"
};

// Initialize Firebase with error handling
let app, auth, db;

try {
    // Check if Firebase is already initialized
    app = initializeApp(firebaseConfig);
    console.log('Firebase app initialized:', app.name);
    
    auth = getAuth(app);
    console.log('Firebase auth initialized');
    
    db = getFirestore(app);
    console.log('Firestore initialized');
} catch (error) {
    console.error('Error initializing Firebase:', error.message);
    if (error.code === 'app/duplicate-app') {
        console.log('Firebase already initialized, getting existing app');
        app = getApp();
        auth = getAuth(app);
        db = getFirestore(app);
    }
}

// Wait for initialization before exporting
if (!app || !auth || !db) {
    console.error('Firebase initialization failed');
}

export { app, auth, db };
