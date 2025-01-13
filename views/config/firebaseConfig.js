import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
require("dotenv").config();

const apiKey=process.env.Api_Key;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "casevault-d1024.firebaseapp.com",
  projectId: "casevault-d1024",
  storageBucket: "casevault-d1024.firebasestorage.app",
  messagingSenderId: "354728843625",
  appId: "1:354728843625:web:ee1df51c9c1faa019705f8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
