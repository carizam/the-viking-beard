const express = require("express");
const router = express.Router();
const { readJsonFile, writeJsonFile } = require("../utils/dataHandler");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await readJsonFile("products.json");
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al leer los productos: " + error.message);
  }
});

// Obtener producto
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productos = await readJsonFile("products.json");
    const producto = productos.find((p) => p.id === id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al leer los productos: " + error.message);
  }
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const productos = await readJsonFile("products.json");
    productos.push(nuevoProducto);
    await writeJsonFile("products.json", productos);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).send("Error al guardar el producto: " + error.message);
  }
});

// Actualizar
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productos = await readJsonFile("products.json");
    const index = productos.findIndex((p) => p.id === id);
    if (index !== -1) {
      productos[index] = { ...productos[index], ...req.body };
      await writeJsonFile("products.json", productos);
      res.json(productos[index]);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al actualizar el producto: " + error.message);
  }
});

// Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let productos = await readJsonFile("products.json");
    productos = productos.filter((p) => p.id !== id);
    await writeJsonFile("products.json", productos);
    res.send("Producto eliminado");
  } catch (error) {
    res.status(500).send("Error al eliminar el producto: " + error.message);
  }
});

module.exports = router;
