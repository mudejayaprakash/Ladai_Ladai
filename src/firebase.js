import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace with your actual Firebase project configuration
// You can get these from the Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
    apiKey: "AIzaSyBgMAAGGEZNKPswSYPwFoYcP2AJFQxRhyk",
    authDomain: "ladai-ladai.firebaseapp.com",
    projectId: "ladai-ladai",
    storageBucket: "ladai-ladai.firebasestorage.app",
    messagingSenderId: "88711366120",
    appId: "1:88711366120:web:971a5116eebfbc23d2505d",
    measurementId: "G-R6ZTX7DGLC"
};

// Debugging helper: Check if keys are loaded
// Configured with provided keys


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
