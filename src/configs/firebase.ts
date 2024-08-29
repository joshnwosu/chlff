import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: import.meta.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

  apiKey: 'AIzaSyCwE3AELnkwzs6E0D6611_IZi4tynAC-2g',
  authDomain: 'chlff-dad1b.firebaseapp.com',
  projectId: 'chlff-dad1b',
  storageBucket: 'chlff-dad1b.appspot.com',
  messagingSenderId: '997031722337',
  appId: '1:997031722337:web:c59baa2552ad9e8c059920',
  measurementId: 'G-H1MDZE230D',
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);
