import React, { Component } from "react";

import withAuthorization from "./withAuthorization";
import { db } from "../firebase";

//creates the homepage that we'll render
class HomePage extends Component {
  constructor(props) {
    super(props);
    //our user is just blank
    this.state = {
      users: {}
    };
  }
  //on componentDidMount, we'll grab all the users from the db, and use this as a database of all possible users
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  //set the users as a destructured object that this.state uses
  render() {
    const { users } = this.state;

    //returns the homepage
    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        {/* sets the userlist as the users we've got*/}
        {!!users && <UserList users={users} />}
      </div>
    );
  }
}

//list of usernames of users which are taken from the firebase database
const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key => <div key={key}>{users[key].username}</div>)}
  </div>
);

//sets the auth condition as the authuser
const authCondition = authUser => !!authUser;

//allows us to use firebase authentication
export default withAuthorization(authCondition)(HomePage);
