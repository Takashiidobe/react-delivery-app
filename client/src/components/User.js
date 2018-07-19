import React, { Component } from "react";
import Place from "react-algolia-places";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      latitude: null,
      longitude: null,
      location: "Lincoln, Nebraska, United States of America",
      keyword: "indian",
      price: "$",
      distance: 5
    };
  }
  componentWillMount() {
    // What happens when the user either declines the geolocation api or its not enabled
    if (!navigator.geolocation) {
      document.getElementById(
        "no-location"
      ).textContent = `Geolocation either isn't enabled or wasn't allowed on this device.`;
      return;
    }
    //fetches the position of the user and sets the state of latitude and longitude accordingly
    const success = position => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      this.setState({
        latitude,
        longitude
      });
    };

    //if there's an error, we'll let the user know that there was an error
    const error = () => {
      document.getElementById(
        "no-location"
      ).textContent = `Oh no, there was an error with geolocation, please manually fill out the contents.`;
      return;
    };

    //the callback function used
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // // Can't get the email on firebase to register properly
  // onSubmitForm = e => {
  //   e.preventDefault();
  //   axios.post(`/api/items/${email}`, {
  //     email,
  //     latitude: this.state.latitude,
  //     longtiude: this.state.longitude,
  //     location: this.state.location,
  //     keyword: this.state.keyword,
  //     price: this.state.price,
  //     distance: this.state.distance
  //   });
  // };

  //if the form for location changes, change the state of location
  handleLocationChange(e) {
    this.setState({
      location: e.target.value
    });
  }

  //if the form for the keyword changes, change this.keyword
  handleKeywordChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  //if the form for the keyword changes, change this.handlepricechange
  handlePriceChange(e) {
    this.setState({
      price: e.target.value
    });
  }

  //change this.distance based on it
  handleDistanceChange(e) {
    this.setState({
      distance: e.target.value
    });
  }

  render() {
    let user = firebase.auth().currentUser;
    let email;
    if (user != null) {
      email = user.email;
    }

    return (
      <div>
        <p>I'm a user!</p>
        <p id="no-location" />
        <form action="/api/items/derek@gmail.com" method="POST">
          <label htmlFor="location">Location:</label>
          <br />
          <input
            type="text"
            name="location"
            defaultValue={this.state.location}
            onChange={this.handleLocationChange}
          />
          <br />
          <label htmlFor="keyword">Keyword:</label>
          <br />
          <input
            type="text"
            name="keyword"
            defaultValue={this.state.keyword}
            onChange={this.handleKeywordChange}
          />
          <br />
          <label htmlFor="price">Price:</label>
          <br />
          <select
            name="price"
            defaultValue={this.state.price}
            onChange={this.handlePriceChange}
          >
            <option value="$">$</option>
            <option defaultValue="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
          <br />
          <label htmlFor="distance">Distance:</label>
          <br />
          <select
            name="distance"
            defaultValue={this.state.distance}
            onChange={this.handleDistanceChange}
          >
            <option value="5">5 miles</option>
            <option defaultValue="10">10 miles</option>
            <option value="15">15 miles</option>
            <option vaule="25">25 miles</option>
          </select>
          <button
            onClick={e => {
              axios
                .post(`/api/items/${email}`, {
                  email,
                  latitude: this.state.latitude,
                  longtiude: this.state.longitude,
                  location: this.state.location,
                  keyword: this.state.keyword,
                  price: this.state.price,
                  distance: this.state.distance
                })
                .then(
                  console.log(
                    email,
                    this.state.latitude,
                    this.state.longitude,
                    this.state.location,
                    this.state.keyword,
                    this.state.price,
                    this.state.distance
                  )
                );
              e.preventDefault();
            }}
          >
            Submit
          </button>
        </form>

        <button onClick={() => console.log(this.state)}>Log State</button>
      </div>
    );
  }
}

export default UserPage;
