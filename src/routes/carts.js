const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");

// Eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid); // Encuentra el carrito por ID

    // Filtra los productos para eliminar el especificado
    cart.products = cart.products.filter(
      (product) => product.productId.toString() !== pid
    );

    await cart.save();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .send("Error al eliminar el producto del carrito: " + error.message);
  }
});

// Actualizar el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findById(cid);
    cart.products = products;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).send("Error al actualizar el carrito: " + error.message);
  }
});

// Actualizar la cantidad de un producto específico en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    const product = cart.products.find(
      (product) => product.productId.toString() === pid
    );

    if (product) {
      product.quantity = quantity; // Actualiza la cantidad
      await cart.save();
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado en el carrito");
    }
  } catch (error) {
    res
      .status(500)
      .send("Error al actualizar el producto en el carrito: " + error.message);
  }
});

// Obtener un carrito con detalles completos de los productos
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate("products.productId");
    res.json(cart);
  } catch (error) {
    res.status(500).send("Error al obtener el carrito: " + error.message);
  }
});

module.exports = router;
