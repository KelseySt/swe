// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "swe6050-822c6.firebaseapp.com",
//   projectId: "swe6050-822c6",
//   storageBucket: "swe6050-822c6.firebasestorage.app",
//   messagingSenderId: "620592048949",
//   appId: "1:620592048949:web:01759715c1b308756c7a7c"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// console.log(db);


import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "swe6050-822c6.firebaseapp.com",
  projectId: "swe6050-822c6",
  storageBucket: "swe6050-822c6.firebasestorage.app",
  messagingSenderId: "620592048949",
  appId: "1:620592048949:web:01759715c1b308756c7a7c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

console.log(db);