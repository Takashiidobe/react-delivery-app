import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import keys from "../config/firebaseKeys";

//initializes an instance of firebase using our app information that has been stored in a config file
if (!firebase.apps.length) {
  firebase.initializeApp(
    keys ||
      (process.env.apiKey &&
        process.env.authDomain &&
        process.env.databaseURL &&
        process.env.projectId &&
        process.env.storageBucket &&
        process.env.messagingSenderId)
  );
}
//uses the firebase db and auth imports to set up an instance of both as well.
const db = firebase.database();
const auth = firebase.auth();

//exports out the database and the authorization database
export { db, auth };
