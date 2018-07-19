import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import store from "./store";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { StripeProvider } from "react-stripe-elements";

//This allows redux to be used all throughout the app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
