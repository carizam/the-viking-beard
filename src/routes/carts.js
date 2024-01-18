const express = require("express");
const router = express.Router();
const { readJsonFile, writeJsonFile } = require("../utils/dataHandler");

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const carritos = await readJsonFile("carrito.json");
    const nuevoCarrito = { id: `c${carritos.length + 1}`, products: [] };
    carritos.push(nuevoCarrito);
    await writeJsonFile("carrito.json", carritos);
    res.status(201).json(nuevoCarrito);
  } catch (error) {
    res.status(500).send("Error al crear el carrito: " + error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const carritos = await readJsonFile("carrito.json");
    const carrito = carritos.find((c) => c.id === id);
    if (carrito) {
      res.json(carrito);
    } else {
      res.status(404).send("Carrito no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al leer el carrito: " + error.message);
  }
});

router.post("/:cartId/product/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    const carritos = await readJsonFile("carrito.json");
    const productos = await readJsonFile("productos.json");
    const carritoIndex = carritos.findIndex((c) => c.id === cartId);
    const producto = productos.find((p) => p.id === productId);

    if (carritoIndex !== -1 && producto) {
      const carrito = carritos[carritoIndex];
      const productIndex = carrito.products.findIndex(
        (p) => p.productId === productId
      );

      if (productIndex !== -1) {
        carrito.products[productIndex].quantity += 1;
      } else {
        carrito.products.push({ productId, quantity: 1 });
      }

      await writeJsonFile("carrito.json", carritos);
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

router.put("/:cartId/product/:productId", async (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const carritos = await readJsonFile("carrito.json");
    const carritoIndex = carritos.findIndex((c) => c.id === cartId);

    if (carritoIndex !== -1) {
      const productIndex = carritos[carritoIndex].products.findIndex(
        (p) => p.productId === productId
      );

      if (productIndex !== -1) {
        carritos[carritoIndex].products[productIndex].quantity = quantity;
        await writeJsonFile("carrito.json", carritos);
        res.json({
          message: `Cantidad del producto ${productId} en el carrito ${cartId} actualizada`,
        });
      } else {
        res.status(404).send("Producto no encontrado en el carrito");
      }
    } else {
      res.status(404).send("Carrito no encontrado");
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
    const carritos = await readJsonFile("carrito.json");
    const carritoIndex = carritos.findIndex((c) => c.id === cartId);

    if (carritoIndex !== -1) {
      const productos = carritos[carritoIndex].products;
      const newProducts = productos.filter((p) => p.productId !== productId);
      carritos[carritoIndex].products = newProducts;

      await writeJsonFile("carrito.json", carritos);
      res.send(`Producto ${productId} eliminado del carrito ${cartId}`);
    } else {
      res.status(404).send("Carrito no encontrado");
    }
  } catch (error) {
    res
      .status(500)
      .send("Error al eliminar el producto del carrito: " + error.message);
  }
});

module.exports = router;
