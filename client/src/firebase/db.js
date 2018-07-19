//imports the db from firebase
import { db } from "./firebase";

// User API
//creates a user with a firebaseId, username, and email
export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

//exports out a oncegetusers which checks users to make sure there's no duplicates
export const onceGetUsers = () => db.ref("users").once("value");
