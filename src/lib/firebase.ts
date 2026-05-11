import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Use environment variables (prefixed with VITE_ for client-side)
const getEnv = (key: string) => import.meta.env[key] || import.meta.env[`VITE_${key}`] || import.meta.env[`VITE_FIREBASE_${key}`] || "";

const firebaseConfig = {
  apiKey: getEnv('apiKey') || getEnv('API_KEY'),
  authDomain: getEnv('authDomain') || getEnv('AUTH_DOMAIN'),
  projectId: getEnv('projectId') || getEnv('PROJECT_ID'),
  storageBucket: getEnv('storageBucket') || getEnv('STORAGE_BUCKET'),
  messagingSenderId: getEnv('messagingSenderId') || getEnv('MESSAGING_SENDER_ID'),
  appId: getEnv('appId') || getEnv('APP_ID'),
  measurementId: getEnv('measurementId') || getEnv('MEASUREMENT_ID'),
  firestoreDatabaseId: getEnv('firestoreDatabaseId') || getEnv('DATABASE_ID'),
};

const isConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined' && firebaseConfig.apiKey !== '');

// Debug log for production/dev verification
if (typeof window !== 'undefined') {
  console.log("%c[FIREBASE STATUS]", "color: #ffde00; background: #111; font-weight: bold; padding: 2px 4px;", isConfigured ? "CONNECTED" : "NOT CONFIGURED");
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
