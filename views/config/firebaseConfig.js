import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwjWQKc3q4bGPlO3I29e0Z6I4uEjusZaQ",
  authDomain: "casevault-d1024.firebaseapp.com",
  projectId: "casevault-d1024",
  storageBucket: "casevault-d1024.firebasestorage.app",
  messagingSenderId: "354728843625",
  appId: "1:354728843625:web:ee1df51c9c1faa019705f8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
