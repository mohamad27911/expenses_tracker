import { initializeApp } from "firebase/app";
import { getAuth }  from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAl2bKKyplR0kosjGuLn9pHYHgqWrGr2I0",
  authDomain: "expenses-tracker-c8997.firebaseapp.com",
  projectId: "expenses-tracker-c8997",
  storageBucket: "expenses-tracker-c8997.appspot.com",
  messagingSenderId: "1068926512240",
  appId: "1:1068926512240:web:1e924011d23f085cf918b5",
  measurementId: "G-BSTLX7D3K2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
