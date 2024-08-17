// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmcQiV63-wy4U2btqbYzsJefD_QVwCSEM",
  authDomain: "prodex-44b7b.firebaseapp.com",
  projectId: "prodex-44b7b",
  storageBucket: "prodex-44b7b.appspot.com",
  messagingSenderId: "283178045590",
  appId: "1:283178045590:web:0c6e0e76b157290e7cf2b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
