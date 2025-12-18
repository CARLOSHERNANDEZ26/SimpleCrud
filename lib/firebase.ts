import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDiyKEJx03DIuW1SwG7EwE7FuB6ogmAUrU", // (Use your actual keys from the screen)
  authDomain: "simple-crud-ff6ef.firebaseapp.com",
  projectId: "simple-crud-ff6ef",
  storageBucket: "simple-crud-ff6ef.firebasestorage.app",
  messagingSenderId: "600575279340",
  appId: "1:600575279340:web:8241aa4f19ac74519be5c9"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);