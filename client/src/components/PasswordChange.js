import React, { Component } from "react";

import { auth } from "../firebase";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

//sets our initial state for password reset (password1 is the first time the user writes, and then password2 is the confirmation)
const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

//uses the intitialstate as the state
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    //sets the initial state as the state
    this.state = { ...INITIAL_STATE };
  }

  // takes out the passwordOne as a variable
  onSubmit = event => {
    const { passwordOne } = this.state;

    //gives firebase the passwordOne to see if it is valid to be provided.  If so, set it back as passwordOne without throwing an error
    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    //prevents form from sending, which would break the site
    event.preventDefault();
  };

  render() {
    //take passwordOne, passwordTwo, and error from the state and turn them into consts
    const { passwordOne, passwordTwo, error } = this.state;

    //if passwordOne and passwordTwo aren't equal or passwordOne is blank, this will render false
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

    return (
      // This form will use the onsubmit function provided
      <form onSubmit={this.onSubmit}>
        {/* first input field is for the first password */}
        <input
          value={passwordOne}
          onChange={event =>
            this.setState(byPropKey("passwordOne", event.target.value))
          }
          type="password"
          placeholder="New Password"
        />
        {/* second input field is for the second password */}
        <input
          value={passwordTwo}
          onChange={event =>
            this.setState(byPropKey("passwordTwo", event.target.value))
          }
          type="password"
          placeholder="Confirm New Password"
        />
        {/* if the passwords dont match or are blank, disable the submit button */}
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {/* if there is an error then render the error message */}
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

// export the password change form!
export default PasswordChangeForm;
