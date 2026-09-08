import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDy_zfNwlrPvY6AexXfdMfhm0sI1NeZceM",
  authDomain: "assimgjb.firebaseapp.com",
  projectId: "assimgjb",
  storageBucket: "assimgjb.firebasestorage.app",
  messagingSenderId: "748302492427",
  appId: "1:748302492427:web:816b95d1656f7940ea780e",
  measurementId: "G-H0YPBJV8L1"
};

let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn("Firebase initialization warning, falling back to client cache:", error);
}

export { app, auth, db, storage };
