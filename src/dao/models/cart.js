const mongoose = require("mongoose");

// Esquema de carritos
const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

// Modelo de carritos
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
