//imports to create our schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema details
const PaymentSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

//export the schema as Item
module.exports = Payment = mongoose.model("payment", PaymentSchema);
