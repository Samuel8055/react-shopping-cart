const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { mongoURI } = require("./config/config");
const Product = require("./models/products");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.Port || 5000;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connection established successfully.`))
  .catch((error) =>
    console.log("Database connection failed! " + error.message)
  );

app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
