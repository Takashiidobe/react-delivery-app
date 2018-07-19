//creates and exports our store, after having combined all of the reducers

import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(rootReducer);

export default store;
