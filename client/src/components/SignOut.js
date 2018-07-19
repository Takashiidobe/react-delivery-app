import React from "react";

import { auth } from "../firebase";

//exports the signout component, which is a button that signs us out on click
const SignOutButton = () => (
  <button type="button" onClick={auth.doSignOut}>
    Sign Out
  </button>
);

export default SignOutButton;
