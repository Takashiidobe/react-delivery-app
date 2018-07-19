import React from "react";
import { connect } from "react-redux";

import { firebase } from "../firebase";

//exports a functional component that allows our exported component to accept an argument
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const { onSetAuthUser } = this.props;

      firebase.auth.onAuthStateChanged(authUser => {
        authUser ? onSetAuthUser(authUser) : onSetAuthUser(null);
      });
    }

    render() {
      return <Component />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({ type: "AUTH_USER_SET", authUser })
  });

  //exports the withauthentication page with react and redux
  return connect(
    null,
    mapDispatchToProps
  )(WithAuthentication);
};

export default withAuthentication;
