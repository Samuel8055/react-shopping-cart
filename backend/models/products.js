const mongoose = require("mongoose");
const shortid = require("shortid");

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String],
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
