import { combineReducers } from "redux";
import sessionReducer from "./session";
import userReducer from "./user";

//exports out the rootReducer to be used by the store
//combines our sessionstate and userstate reducers
const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer
});

export default rootReducer;
