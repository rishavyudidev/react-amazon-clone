// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAEb8hL_9PflIgXxEmaAC9_TOkqERxFRc",
  authDomain: "clone-8ea18.firebaseapp.com",
  projectId: "clone-8ea18",
  storageBucket: "clone-8ea18.appspot.com",
  messagingSenderId: "829525877565",
  appId: "1:829525877565:web:8fc83dbceb2c8a2bde9b54",
  measurementId: "G-5NM6GGK1NM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;