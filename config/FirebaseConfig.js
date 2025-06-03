// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-app-1e946.firebaseapp.com",
  projectId: "pet-adopt-app-1e946",
  storageBucket: "pet-adopt-app-1e946.firebasestorage.app",
  messagingSenderId: "690199414332",
  appId: "1:690199414332:web:f3b9086f05174b9d78e539",
  measurementId: "G-V18TYLH75R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
// export const storage = getStorage(app);
// const analytics = getAnalytics(app);
export {db};