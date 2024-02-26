// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqIvRXlldXGS2rZ5ru6-H7gcP2U95Bpas",
    authDomain: "employee-dashboard-589c5.firebaseapp.com",
    projectId: "employee-dashboard-589c5",
    storageBucket: "employee-dashboard-589c5.appspot.com",
    messagingSenderId: "769847701256",
    appId: "1:769847701256:web:a1e343686deed6742906bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage