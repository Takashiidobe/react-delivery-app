//imports to create our schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema details
const QuerySchema = new Schema({
  email: {
    type: String,
    required: true
  },
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  location: {
    type: String,
    required: true
  },
  keyword: {
    type: String
  },
  price: {
    type: String
  },
  distance: {
    type: Number,
    default: 5
  }
});

//export the schema as Query
module.exports = Query = mongoose.model("query", QuerySchema);
