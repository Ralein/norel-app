// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQkAmWWHHBIIchA0wBTDEEqzG6tFYMS5g",
  authDomain: "glint-ai-68743.firebaseapp.com",
  projectId: "glint-ai-68743",
  storageBucket: "glint-ai-68743.firebasestorage.app",
  messagingSenderId: "558231928792",
  appId: "1:558231928792:web:d1e1eb208b25fe10bcfcad",
  measurementId: "G-2RNCB1RZ6D"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };