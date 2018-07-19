import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

//creates the password forget page
const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

//sets the initial state as not having an email and no error
const INITIAL_STATE = {
  email: "",
  error: null
};

//creates the passwordForgetForm we're going to export
class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
    //spreads out the initial state
    this.state = { ...INITIAL_STATE };
  }

  //define the onsubmit event
  onSubmit = event => {
    //deconstructs the email and sets it to this.state
    const { email } = this.state;
    //use the firebase passwordReset Event
    auth
      .doPasswordReset(email)
      //then set our user to having no email or error
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      //if there is an error, let us know
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    //prevent default so we don't submit the form on click, which would reload the page and break the form
    event.preventDefault();
  };

  render() {
    //sets our email and error as the this.state variables
    const { email, error } = this.state;

    // if the email is an empty string, this will tell us true or false
    const isInvalid = email === "";

    //renders the password forget form
    return (
      //do the onsubmit action on submit
      // sets our state to the email provided by the user
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        {/* if the email is an empty string, disable this button */}
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {/* If we have an error, display the error in a p tag */}
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

//creates a passwordForgetLink, which links us to the /pw-forget route
const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>
);

//default export is the passwordforgetpage class
export default PasswordForgetPage;

//the named exports are the password forget form and the password forget link
export { PasswordForgetForm, PasswordForgetLink };
