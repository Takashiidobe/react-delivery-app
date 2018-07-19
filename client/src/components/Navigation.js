import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./navigation.css";

import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";

//If the user is logged in, render the Navigation bar for the logged in user, else, render the Non-loggedIn Navigation bar
const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

//this is the navbar if we have a user logged in
//first link goes to the landing page
//second link goes to the home page
//third link goes to the account page
//fourth link renders the cart page
//fifth link renders the signout button
const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={routes.DRIVER}>Driver Dashboard</Link>
    </li>
    <li>
      <Link to={routes.USER}>User Dashboard</Link>
    </li>
    <li>
      <Link to={routes.RESTAURANT}>Restaurant Dashboard</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

//This is the navbar which has been rendered if we're not logged in
//render a link to the landing page or the sign-in page
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={routes.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={routes.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

//export this out as the sessionstate.authUser for the redux store to use
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);
