import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';
import configJson from '../firebase-applet-config.json';

let adminApp: App | null = null;
let adminDb: Firestore | null = null;
let adminAuth: Auth | null = null;

const privateKeyRaw = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const projectId = process.env.FIREBASE_PROJECT_ID || configJson.projectId;

if (privateKeyRaw && clientEmail) {
  try {
    const formattedPrivateKey = privateKeyRaw.replace(/\\n/g, '\n');

    const adminConfig = {
      type: process.env.FIREBASE_ADMIN_TYPE || 'service_account',
      projectId: projectId,
      privateKey: formattedPrivateKey,
      clientEmail: clientEmail,
      tokenUri: process.env.FIREBASE_ADMIN_TOKEN_URI || 'https://oauth2.googleapis.com/token',
      universeDomain: process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN || 'googleapis.com',
    };

    if (!getApps().length) {
      adminApp = initializeApp({
        credential: cert(adminConfig as any),
        projectId: projectId,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || configJson.storageBucket,
      });
    } else {
      adminApp = getApps()[0] as App;
    }

    const databaseId = process.env.FIRESTORE_DATABASE_ID || configJson.firestoreDatabaseId;
    if (databaseId && databaseId !== '(default)') {
      adminDb = getFirestore(adminApp, databaseId);
    } else {
      adminDb = getFirestore(adminApp);
    }

    adminAuth = getAuth(adminApp);
  } catch (err) {
    console.warn('Firebase Admin SDK initialization note:', err);
  }
}

export { adminApp, adminDb, adminAuth };
