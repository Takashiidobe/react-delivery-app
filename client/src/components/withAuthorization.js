import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { firebase } from "../firebase";
import * as routes from "../constants/routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    //renders the react fragment if we are signed in
    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }
  // export to redux
  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
  });

  //wrap around redux and react-router's middleware function
  return compose(
    withRouter,
    connect(mapStateToProps)
  )(WithAuthorization);
};

export default withAuthorization;
