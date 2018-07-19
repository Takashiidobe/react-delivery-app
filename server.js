//our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const yelp = require("yelp-fusion");
const apiKey = require("./config/keys").yelpApiKey;

const client = yelp.client(apiKey);

//set the query variable as our route
const query = require("./routes/api/query");

//start an instance of express
const app = express();

// bodyparser.json() allows us to read api calls in json format
app.use(bodyParser.json());

// this is our mlab url with a username and password
const db = require("./config/keys").mongoURI || process.env.mongoURI;

// Connect to Mongo
//we'll use the mlab url and connect to the server
//if it connects, log to server that we've connected
//else log the error that we've gotten
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// sets the route api/items as our middleware
app.use("/api/items", query);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//set our port (this is for heroku) or 5000
const port = process.env.PORT || 5000;

//listen on either the heroku or localhost port and let us know we've connected properly
app.listen(port, () => console.log(`Server started on port ${port}`));
