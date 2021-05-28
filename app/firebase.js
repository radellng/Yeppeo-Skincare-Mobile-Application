import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const fire = firebase.initializeApp({
  apiKey: "AIzaSyAfjJYKgsVJADzEOne2dcuct3Iis8cj1ek",
  authDomain: "yeppeo-469e9.firebaseapp.com",
  projectId: "yeppeo-469e9",
  storageBucket: "yeppeo-469e9.appspot.com",
  messagingSenderId: "657351763947",
  appId: "1:657351763947:web:20e1c60e68330465471bae",
  measurementId: "G-QBV8QN825H",
});

export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};
