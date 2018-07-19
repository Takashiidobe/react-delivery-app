import { auth } from "./firebase";

//this is the signup action
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);

//Signin action
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//Signout action
export const doSignOut = () => auth.signOut();

//Password reset action
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

//Password Change action
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);
