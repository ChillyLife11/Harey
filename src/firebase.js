import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import config from '@/config.js';

const firebaseConfig = {
	apiKey:            config.FIREBASE.API_KEY,
	authDomain:        config.FIREBASE.AUTH_DOMAIN,
	projectId:         config.FIREBASE.PROJECT_ID,
	storageBucket:     config.FIREBASE.STORAGE_BUCKET,
	messagingSenderId: config.FIREBASE.MESSAGING_SENDER_ID,
	appId:             config.FIREBASE.APP_ID
};

console.log(firebaseConfig)

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

export default db;