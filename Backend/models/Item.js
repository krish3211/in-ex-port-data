const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  purchase_date: {
    type: String,
    required: true,
  },
  purchased_by: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  store_name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
