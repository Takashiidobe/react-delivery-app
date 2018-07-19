import React, { Component } from "react";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as routes from "../constants/routes";
import StripeCheckout from "./StripeCheckout";

import withAuthorization from "./withAuthorization";

let amount = 0;
const cartStyle = {
  border: "1px solid black",
  textAlign: "center",
  width: "fit-content"
};

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartTotal: 0,
      email: "",
      username: "",
      uid: "",
      cartPrice: 0
    };
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    let username, email, uid;
    if (user != null) {
      username = user.displayName;
      email = user.email;
      uid = user.uid;
    }
    console.log(email);
    this.setState({
      email,
      username,
      uid
    });
    //res.data grabs all the items
    //we should map over all the items in order to get them to display

    axios
      .get(`/api/items/${email}`)
      .then(res =>
        this.setState({
          cart: res.data
        })
      )
      .catch(err => console.log(err));

    axios
      .get(`/api/items/${email}`)
      .then(res =>
        res.data.map(x =>
          this.setState({
            cartTotal: (this.state.cartTotal += Object.values(x)[2] / 100)
          })
        )
      )
      .catch(err => console.log(err));
  }

  onClearCart = () => {
    // clears out the cart
    axios
      .delete(`/api/items/${this.state.email}`)
      .then(res =>
        this.setState({
          cart: res.data
        })
      )
      .then(
        this.setState({
          cartTotal: 0
        })
      )
      .catch(err => console.log(err));

    //updates the state to reflect it
    axios
      .get(`/api/items/${this.state.email}`)
      .then(res =>
        this.setState({
          cart: res.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <button onClick={this.logPaymentTotal}>Log Payment total</button>
        <br />
        <button onClick={this.readyPayment}>Ready Payment</button>
        <p>Hi {this.state.email}</p>
        <StripeCheckout
          name={"Cart Items"}
          description={"The contents of your cart"}
          amount={this.state.cartTotal} //placeholder for now, $99.99
        />
        <br />
        <br />
        <button onClick={this.onClearCart}>Clear out your Cart</button>
        <ul>
          {this.state.cart.map((items, index) => (
            <li key={index} style={cartStyle}>
              Item: {items.name}
              <br />
              Price: {`$${items.price / 100}`}
              <br />
              ItemID: {items.itemID}
              <br />
              {/* Redundancy makes it work much better */}
              <button
                onClick={() => {
                  axios
                    .delete(`/api/items/${this.state.email}/${items.itemID}`)
                    .then(
                      axios.get(`/api/items/${this.state.email}`).then(res =>
                        this.setState({
                          cart: res.data
                        })
                      )
                    );

                  axios.get(`/api/items/${this.state.email}`).then(res =>
                    this.setState({
                      cart: res.data
                    })
                  );
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

//sets the auth condition as the authuser
const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(CheckoutPage);
