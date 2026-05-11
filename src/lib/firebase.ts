import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Use environment variables (prefixed with VITE_ for client-side)
const firebaseConfig = {
  apiKey: 
    import.meta.env.VITE_FIREBASE_API_KEY || 
    import.meta.env.VITE_API_KEY || 
    import.meta.env.VITE_apiKey ||
    import.meta.env.VITE_APIKEY,
  authDomain: 
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 
    import.meta.env.VITE_AUTH_DOMAIN || 
    import.meta.env.VITE_authDomain ||
    import.meta.env.VITE_AUTHDOMAIN,
  projectId: 
    import.meta.env.VITE_FIREBASE_PROJECT_ID || 
    import.meta.env.VITE_PROJECT_ID || 
    import.meta.env.VITE_projectId ||
    import.meta.env.VITE_PROJECTID,
  storageBucket: 
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 
    import.meta.env.VITE_STORAGE_BUCKET || 
    import.meta.env.VITE_storageBucket ||
    import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: 
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 
    import.meta.env.VITE_MESSAGING_SENDER_ID || 
    import.meta.env.VITE_messagingSenderId ||
    import.meta.env.VITE_MESSAGINGSENDERID,
  appId: 
    import.meta.env.VITE_FIREBASE_APP_ID || 
    import.meta.env.VITE_APP_ID || 
    import.meta.env.VITE_appId ||
    import.meta.env.VITE_APPID,
  measurementId: 
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 
    import.meta.env.VITE_MEASUREMENT_ID || 
    import.meta.env.VITE_measurementId ||
    import.meta.env.VITE_MEASUREMENTID,
  firestoreDatabaseId: 
    import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || 
    import.meta.env.VITE_DATABASE_ID || 
    import.meta.env.VITE_firestoreDatabaseId ||
    import.meta.env.VITE_DATABASEID,
};

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined');

if (import.meta.env.DEV) {
  console.log("Firebase Configuration Status:", isConfigured ? "CONNECTED" : "NOT CONFIGURED");
}

// Initialize Firebase only if the API key is present
const app = isConfigured 
  ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig))
  : null;

export const db = app ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : null;
export const auth = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (!auth) {
    throw new Error("Firebase is not configured. Please add your credentials in the Settings menu (VITE_FIREBASE_API_KEY, etc).");
  }
  return signInWithPopup(auth, googleProvider);
};

export { isConfigured };
