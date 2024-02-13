const mongoose = require("mongoose");

// Esquema de productos
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

// Modelo de productos
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
