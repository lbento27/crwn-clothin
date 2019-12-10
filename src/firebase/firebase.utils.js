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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //if theres no user

  const userRef = firestore.doc(`users/${userAuth.uid}`); // get that user reference at that location, "users/" that collection, that uid is a property that the authentication with google , firebase automatic creates for every user
  const snapShot = await userRef.get(); //get user .get() gives us an object with a property exists

  //check if we already store that user object
  if (!snapShot.exists) {
    //if do not exist create that user
    const { displayName, email } = userAuth; //get displayName and email from userAuth
    const createdAt = new Date();
    //save that user so we use try catch
    try {
      //.set() = create method
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData //spread any additional data
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef; //return if we want to use it later
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
