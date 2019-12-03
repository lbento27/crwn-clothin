import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD-9GKQV43gqBaVpHAlI8mtddhdlqB6dmk",
  authDomain: "crwn-db-3183c.firebaseapp.com",
  databaseURL: "https://crwn-db-3183c.firebaseio.com",
  projectId: "crwn-db-3183c",
  storageBucket: "crwn-db-3183c.appspot.com",
  messagingSenderId: "379582394762",
  appId: "1:379582394762:web:3fab1a36f27ac00c241873",
  measurementId: "G-66HRJ1P945"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
