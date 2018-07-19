import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { PasswordForgetForm } from "./PasswordForget";
import PasswordChangeForm from "./PasswordChange";
import withAuthorization from "./withAuthorization";

//for a signed in user, the account page shows us:
//our email
//The password Forget Form
//The password change form
const AccountPage = ({ authUser }) => (
  <div>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

//export this out in a way that the react router can use
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

//set the auth condition to the reverse of what it currently is
const authCondition = authUser => !!authUser;

//export in a format using react-router, react-redux, and firebase
//compose creates a combined store
//uses withauthorization from our withauthorization component
//sets the authcondition as not our authcondition
//and connects it to the redux store
//then exports it out as the accountpage in total
export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
