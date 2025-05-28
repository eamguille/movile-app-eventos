// services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAW00ZeXus4OoLZZrtlSDkq6Z-niqVXB9A",
  authDomain: "eventos-comunitarios-ae7fb.firebaseapp.com",
  projectId: "eventos-comunitarios-ae7fb",
  storageBucket: "eventos-comunitarios-ae7fb.firebasestorage.app",
  messagingSenderId: "143446919600",
  appId: "1:143446919600:web:e1b3cc2c13b86731baee75"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
