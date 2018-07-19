//sets the initial state to having no users
const INITIAL_STATE = {
  users: {}
};

//after we fetch the user, set it as our user
const applySetUsers = (state, action) => ({
  ...state,
  users: action.users
});

//if we have a user, set the user.
//else, just do nothing
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "USERS_SET": {
      return applySetUsers(state, action);
    }
    default:
      return state;
  }
}

//exports out the userreducer function we have defined
export default userReducer;
