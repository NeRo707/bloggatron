import {
  getAuth,
  createUserWithEmailAndPassword as signUpUser,
  signInWithEmailAndPassword as signInUser,
} from "firebase/auth";
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import serviceAccount from "./eserviceAccKey.json";

import "dotenv/config";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
};

const app = initializeApp(firebaseConfig); // Firebase App
const database = admin.firestore; // Firestore Database
const auth = getAuth(app); // Firebase Authentication

export { app, database, auth, signUpUser, admin, signInUser };
