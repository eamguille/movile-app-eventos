// services/firebase.js
// import { initializeApp } from 'firebase/app';
// import { connectAuthEmulator, getAuth } from 'firebase/auth';
// import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
// import { connectStorageEmulator, getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'fake-api-key',
//   authDomain: 'localhost',
//   projectId: 'eventos-comunitarios-ae7fb',
//   storageBucket: 'demo-project.appspot.com',
//   messagingSenderId: '1234567890',
//   appId: 'fake-app-id',
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// // Conexión a emuladores SOLO en desarrollo local
// if (__DEV__) {
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectStorageEmulator(storage, 'localhost', 9199);
// }

// export { auth, db, storage };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW00ZeXus4OoLZZrtlSDkq6Z-niqVXB9A",
  authDomain: "eventos-comunitarios-ae7fb.firebaseapp.com",
  projectId: "eventos-comunitarios-ae7fb",
  storageBucket: "eventos-comunitarios-ae7fb.firebasestorage.app",
  messagingSenderId: "143446919600",
  appId: "1:143446919600:web:e1b3cc2c13b86731baee75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

