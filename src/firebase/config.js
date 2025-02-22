
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMFXXpxicp0AXdMv8iOWeh62bYI2c3Srg",
  authDomain: "staff-app-4749c.firebaseapp.com",
  projectId:"staff-app-4749c",
  storageBucket: "staff-app-4749c.firebasestorage.app",
  messagingSenderId: "370207929151",
  appId: "1:370207929151:web:6b526ba74330e0ab3c598a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)