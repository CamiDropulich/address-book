import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBrThxU_ngKngWYc9blMQ49YIsMRH6sRKE",
  authDomain: "address-db-c1d9a.firebaseapp.com",
  databaseURL:
    "https://address-db-c1d9a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "address-db-c1d9a",
  storageBucket: "address-db-c1d9a.appspot.com",
  messagingSenderId: "469084943177",
  appId: "1:469084943177:web:07e6b58750c46915256098",
});

const db = firebaseApp.database();

export { db };
