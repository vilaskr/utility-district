import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Safely load the firebase-applet-config.json file if it exists (using Vite's import.meta.glob to avoid build errors if the file is ignored/missing in git)
let firebaseAppletConfig: any = {};
try {
  const configs = import.meta.glob('../../firebase-applet-config.json', { eager: true });
  const configKeys = Object.keys(configs);
  if (configKeys.length > 0) {
    const mod = configs[configKeys[0]] as any;
    firebaseAppletConfig = mod.default || mod;
  }
} catch (e) {
  // Gracefully fall back to empty config if not found
}

// In production Vite builds, dynamic indexing like `import.meta.env[key]` gets optimized out.
// We must statically access keys for reliable behavior on Vercel.
const getStaticEnv = (key: string): string => {
  const upperKey = key.toUpperCase();
  
  // 1. Static checks for standard environment variables (supporting both uppercase/snake_case and camelCase as seen in Vercel configs)
  if (upperKey === 'API_KEY') {
    return import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_API_KEY || import.meta.env.VITE_apiKey || "";
  }
  if (upperKey === 'AUTH_DOMAIN') {
    return import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_AUTH_DOMAIN || import.meta.env.VITE_authDomain || "";
  }
  if (upperKey === 'PROJECT_ID') {
    return import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_PROJECT_ID || import.meta.env.VITE_projectId || "";
  }
  if (upperKey === 'STORAGE_BUCKET') {
    return import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_STORAGE_BUCKET || import.meta.env.VITE_storageBucket || "";
  }
  if (upperKey === 'MESSAGING_SENDER_ID') {
    return import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_MESSAGING_SENDER_ID || import.meta.env.VITE_messagingSenderId || "";
  }
  if (upperKey === 'APP_ID') {
    return import.meta.env.VITE_FIREBASE_APP_ID || import.meta.env.VITE_APP_ID || import.meta.env.VITE_appId || "";
  }
  if (upperKey === 'MEASUREMENT_ID') {
    return import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || import.meta.env.VITE_MEASUREMENT_ID || import.meta.env.VITE_measurementId || "";
  }
  if (upperKey === 'FIRESTORE_DATABASE_ID' || upperKey === 'DATABASE_ID') {
    return import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || import.meta.env.VITE_DATABASE_ID || import.meta.env.VITE_firestoreDatabaseId || "";
  }

  // 2. Fallback to offline/blueprints configuration file if available
  return firebaseAppletConfig[key] || firebaseAppletConfig[upperKey] || "";
};

const firebaseConfig = {
  apiKey: getStaticEnv('API_KEY') || getStaticEnv('apiKey'),
  authDomain: getStaticEnv('AUTH_DOMAIN') || getStaticEnv('authDomain'),
  projectId: getStaticEnv('PROJECT_ID') || getStaticEnv('projectId'),
  storageBucket: getStaticEnv('STORAGE_BUCKET') || getStaticEnv('storageBucket'),
  messagingSenderId: getStaticEnv('MESSAGING_SENDER_ID') || getStaticEnv('messagingSenderId'),
  appId: getStaticEnv('APP_ID') || getStaticEnv('appId'),
  measurementId: getStaticEnv('MEASUREMENT_ID') || getStaticEnv('measurementId'),
  firestoreDatabaseId: getStaticEnv('DATABASE_ID') || getStaticEnv('firestoreDatabaseId') || 'ai-studio-b2a9be90-6794-4881-8521-9f6e040d2b90',
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

export const db = app 
  ? (firebaseConfig.firestoreDatabaseId 
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId) 
      : getFirestore(app)) 
  : null;
export const auth = app ? getAuth(app) : null;
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  if (!auth) {
    throw new Error("Firebase is not configured. Please add your credentials in the Settings menu (VITE_FIREBASE_API_KEY, etc).");
  }
  return signInWithPopup(auth, googleProvider);
};

export { isConfigured };
