import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyDiyKEJx03DIuW1SwG7EwE7FuB6ogmAUrU", 
  authDomain: "simple-crud-ff6ef.firebaseapp.com",
  projectId: "simple-crud-ff6ef",
  storageBucket: "simple-crud-ff6ef.firebasestorage.app",
  messagingSenderId: "600575279340",
  appId: "1:600575279340:web:8241aa4f19ac74519be5c9"
};

// here, we initialize the Firebase application instance
const app = initializeApp(firebaseConfig);

// we export the 'db' variable. This serves as our database connection
// which we will use in our API routes to read and write data.
export const db = getFirestore(app);