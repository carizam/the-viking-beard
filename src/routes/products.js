const express = require("express");
const router = express.Router();
const Product = require("../dao/models/product");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al leer los productos: " + error.message);
  }
});

// Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Product.findById(id);
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
    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).send("Error al guardar el producto: " + error.message);
  }
});

// Actualizar producto por ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (productoActualizado) {
      res.json(productoActualizado);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al actualizar el producto: " + error.message);
  }
});

// Eliminar producto por ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productoEliminado = await Product.findByIdAndRemove(id);
    if (productoEliminado) {
      res.send("Producto eliminado");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el producto: " + error.message);
  }
});

module.exports = router;
