import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import { auth } from "../firebase";
import * as routes from "../constants/routes";

//sets the signinpage and names the parameter passed in as history
const SignInPage = ({ history }) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

//set the initial state as having no email or password and no error
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

//defines the signinform as the initial state
class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  //onsubmit event
  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;
    //signs us in as the information provided
    //redirects to homepage
    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      //if error, display the error
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
    //prevents the form from submitting on its own
    event.preventDefault();
  };

  render() {
    //sets the email, password, and error from the state
    const { email, password, error } = this.state;
    //if the password or email is invalid, sets this var as false
    const isInvalid = password === "" || email === "";

    return (
      //defines the form as to use the onsubmit form
      <form onSubmit={this.onSubmit}>
        {/* sets the email  */}
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        {/* sets the password */}
        <input
          value={password}
          onChange={event =>
            this.setState(byPropKey("password", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        {/* sets the button to be disabled */}
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {/* renders the error message if it exists */}
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
//exports the page as having the router
export default withRouter(SignInPage);

export { SignInForm };
