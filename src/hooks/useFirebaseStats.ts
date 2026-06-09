import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp, 
  increment
} from 'firebase/firestore';
import { db, isConfigured } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
  };
}

// Global firestore error helper following system guidelines
function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null, 
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Generate unique session ID for presence
const getSessionId = (): string => {
  let id = sessionStorage.getItem('presence_session_id');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    sessionStorage.setItem('presence_session_id', id);
  }
  return id;
};

export function usePresence() {
  const [activeUsers, setActiveUsers] = useState<number>(1);

  useEffect(() => {
    if (!isConfigured || !db) return;

    const sessionId = getSessionId();
    const docRef = doc(db, 'presence', sessionId);

    // Write presence with serverTimestamp
    const heartbeat = async () => {
      try {
        await setDoc(docRef, { lastActive: serverTimestamp() }, { merge: true });
      } catch (err) {
        console.warn("Presence heartbeat failed:", err);
      }
    };

    // Initial heartbeat
    heartbeat();

    // Heartbeat interval: update presence every 30 seconds
    const intervalId = setInterval(heartbeat, 30000);

    // Clean up presence on unmount / window unload
    const cleanupPresence = async () => {
      try {
        await deleteDoc(docRef);
      } catch (err) {
        console.warn("Presence cleanup failed:", err);
      }
    };

    window.addEventListener('beforeunload', cleanupPresence);

    // Listen to real-time active users
    const unsub = onSnapshot(
      collection(db, 'presence'),
      (snapshot) => {
        const now = Date.now();
        let count = 0;
        
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (!data.lastActive) {
            // Document recently written, timestamp not resolved yet on server
            count++;
          } else {
            const lastActiveMs = typeof data.lastActive.toMillis === 'function' 
              ? data.lastActive.toMillis() 
              : (data.lastActive.seconds * 1000 || now);
            
            // If active in the last 2 minutes, count as active
            if (now - lastActiveMs < 2 * 60 * 1000) {
              count++;
            }
          }
        });
        
        // Ensure at least 1 (current user is active)
        setActiveUsers(count > 0 ? count : 1);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'presence');
      }
    );

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('beforeunload', cleanupPresence);
      cleanupPresence();
      unsub();
    };
  }, []);

  return { activeUsers };
}

export function useViewCount() {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isConfigured || !db) return;

    const totalDocRef = doc(db, 'view_count', 'total');

    // Run increment only once per tab session to avoid double counts on HMR/reloads
    const incrementViews = async () => {
      const hasVisited = sessionStorage.getItem('view_count_incremented');
      if (!hasVisited) {
        try {
          await setDoc(totalDocRef, { count: increment(1) }, { merge: true });
          sessionStorage.setItem('view_count_incremented', 'true');
        } catch (err) {
          console.warn("Failed to increment views:", err);
        }
      }
    };

    incrementViews();

    // Subscribe to total view count real-time
    const unsub = onSnapshot(
      totalDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setViewCount(snapshot.data().count);
        } else {
          setViewCount(1);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'view_count/total');
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return { viewCount };
}
