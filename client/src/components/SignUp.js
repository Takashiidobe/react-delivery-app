import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { auth, db } from "../firebase";
import * as routes from "../constants/routes";

//sets the inital state
//our username field,
//email field
//passwordone field
//passwordtwo field
//and no error
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

//creates a signuppage which names the provided variable as history
//then it renders a signup and the history param provided
const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </div>
);

//exports the class signupform
class SignUpForm extends Component {
  constructor(props) {
    super(props);
    //sets the state as the initial state
    this.state = { ...INITIAL_STATE };
  }

  //sets the onsubmit event
  onSubmit = event => {
    // eslint-disable-next-line
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    //creates a user with the provided email and password
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        //then take that information and generate a user.id and pass the username and email forward
        db.doCreateUser(authUser.user.uid, username, email)
          //then we'll set that as our current user (sign in automatically) and send us back to the homepage
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          //if there's an error, let us know
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      //if there's an error, let us know
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    //prevent the form from submitting which would defeat the purpose of the form submit
    event.preventDefault();
  };

  render() {
    //take the initial state and use that as our state
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    //if there is any sort of error in the form filled out, this will render false
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";
    return (
      //sets out our form
      //onsubmit, we'll submit the username, email, passwordone, passwordTwo, and the error message if it exists
      <form onSubmit={this.onSubmit}>
        {" "}
        <input
          value={username}
          onChange={event =>
            this.setState(byPropKey("username", event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event =>
            this.setState(byPropKey("passwordOne", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event =>
            this.setState(byPropKey("passwordTwo", event.target.value))
          }
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

//If you dont have an account, send a link to the signup page
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

//uses the router with the signuppage
export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
