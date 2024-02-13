const express = require("express");
const router = express.Router();
const Cart = require("../dao/models/cart");
const Product = require("../dao/models/product");

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const nuevoCarrito = new Cart();
    const carritoGuardado = await nuevoCarrito.save();
    res.status(201).json(carritoGuardado);
  } catch (error) {
    res.status(500).send("Error al crear el carrito: " + error.message);
  }
});

// Obtener un carrito por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Cart.findById(id).populate("products.product");
    if (carrito) {
      res.json(carrito);
    } else {
      res.status(404).send("Carrito no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al leer el carrito: " + error.message);
  }
});

// Agregar producto al carrito
router.post("/:cartId/product/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const carrito = await Cart.findById(cartId);
    const producto = await Product.findById(productId);

    if (carrito && producto) {
      const productIndex = carrito.products.findIndex((item) =>
        item.product.equals(productId)
      );

      if (productIndex !== -1) {
        carrito.products[productIndex].quantity += 1; // Incrementar cantidad si el producto ya existe
      } else {
        carrito.products.push({ product: productId, quantity: 1 }); // Agregar nuevo producto si no existe
      }

      await carrito.save();
      res.json({
        message: `Producto ${productId} agregado al carrito ${cartId}`,
      });
    } else {
      res.status(404).send("Carrito o producto no encontrado");
    }
  } catch (error) {
    res
      .status(500)
      .send("Error al agregar el producto al carrito: " + error.message);
  }
});

// Actualizar cantidad de un producto en el carrito
router.put("/:cartId/product/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const carrito = await Cart.findById(cartId);
    const productIndex = carrito.products.findIndex((item) =>
      item.product.equals(productId)
    );

    if (productIndex !== -1 && quantity > 0) {
      carrito.products[productIndex].quantity = quantity;
      await carrito.save();
      res.json({
        message: `Cantidad del producto ${productId} en el carrito ${cartId} actualizada`,
      });
    } else {
      res
        .status(404)
        .send("Producto no encontrado en el carrito o cantidad no válida");
    }
  } catch (error) {
    res
      .status(500)
      .send("Error al actualizar el producto en el carrito: " + error.message);
  }
});

// Eliminar un producto del carrito
router.delete("/:cartId/product/:productId", async (req, res) => {
  const { cartId, productId } = req.params;

  try {
    const carrito = await Cart.findById(cartId);
    carrito.products = carrito.products.filter(
      (item) => !item.product.equals(productId)
    );
    await carrito.save();
    res.send(`Producto ${productId} eliminado del carrito ${cartId}`);
  } catch (error) {
    res
      .status(500)
      .send("Error al eliminar el producto del carrito: " + error.message);
  }
});

module.exports = router;
