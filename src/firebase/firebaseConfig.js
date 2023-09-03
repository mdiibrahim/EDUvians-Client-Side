// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDd6o-oSweUfn_klJ8_u972MKNtGu9dxWY",
    authDomain: "eduvians-edu.firebaseapp.com",
    projectId: "eduvians-edu",
    storageBucket: "eduvians-edu.appspot.com",
    messagingSenderId: "513309360072",
    appId: "1:513309360072:web:23f4dfc14865e6d36a8afd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };