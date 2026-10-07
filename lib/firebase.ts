import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import configJson from '../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || configJson.apiKey,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || configJson.authDomain,
  projectId: process.env.FIREBASE_PROJECT_ID || configJson.projectId,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || configJson.storageBucket,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || configJson.messagingSenderId,
  appId: process.env.FIREBASE_APP_ID || configJson.appId,
  firestoreDatabaseId: process.env.FIRESTORE_DATABASE_ID || configJson.firestoreDatabaseId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
    : getFirestore(app);

export const auth = getAuth(app);
export { app };
