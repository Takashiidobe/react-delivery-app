import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

export default class TakeMoney extends Component {
  onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };
  render() {
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="my_PUBLISHABLE_stripekey"
        />
      </div>
    );
  }
}
