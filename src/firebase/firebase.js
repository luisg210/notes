// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoI_sGuk5BcU0ReLF4DxrFRm8X2ZGq5Rk",
  authDomain: "employees-97b61.firebaseapp.com",
  projectId: "employees-97b61",
  storageBucket: "employees-97b61.appspot.com",
  messagingSenderId: "640644243907",
  appId: "1:640644243907:web:9320df66a1850bf08cdd76"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuth = firebase.auth.GoogleAuthProvider();

export { db, firebase, googleAuth };