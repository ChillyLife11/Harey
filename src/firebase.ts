import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs4c1YBIaQZxCV5rarMmVWvHkC9gSmxSU",
  authDomain: "harey-cde9d.firebaseapp.com",
  projectId: "harey-cde9d",
  storageBucket: "harey-cde9d.appspot.com",
  messagingSenderId: "781815806230",
  appId: "1:781815806230:web:2845ac01983e9be2137837"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export default db;