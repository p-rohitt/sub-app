
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAeN08CxRZyTF1xevu_dlGuxR8J2U4zfo",
  authDomain: "subscription-37210.firebaseapp.com",
  projectId: "subscription-37210",
  storageBucket: "subscription-37210.appspot.com",
  messagingSenderId: "966684806386",
  appId: "1:966684806386:web:e01f1d19f8488e2979146b",
  measurementId: "G-HQYEFYZFM2",
};



const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
export { auth };
export default db;
