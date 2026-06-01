const { initializeApp } = require("firebase/app");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzM238_w60hlhLefSa2rOgEHQKh7mPjmc",
  authDomain: "authentication-9f424.firebaseapp.com",
  projectId: "authentication-9f424",
  storageBucket: "authentication-9f424.firebasestorage.app",
  messagingSenderId: "751284971040",
  appId: "1:751284971040:web:f254d51ea7e1cea0407e45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;