
import { initializeApp } from "firebase/app";

import { 
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
 } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyC4INsXPyeszZH8HXcGrbvdTh1c2WYBpDo",
  authDomain: "redux-firebase-auth-6a65c.firebaseapp.com",
  projectId: "redux-firebase-auth-6a65c",
  storageBucket: "redux-firebase-auth-6a65c.appspot.com",
  messagingSenderId: "425259576225",
  appId: "1:425259576225:web:0d10ad73f0501c4dfff9e0"
};

initializeApp(firebaseConfig);

//services
const auth = getAuth();

export {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
}