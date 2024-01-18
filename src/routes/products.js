const express = require("express");
const router = express.Router();
const { readJsonFile } = require("../utils/dataHandler");

router.get("/", async (req, res) => {
  try {
    const productos = await readJsonFile("productos.json");
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al leer los productos");
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Detalles del producto ${id}` });
});

// Crear un nuevo producto
router.post("/", (req, res) => {
  res.status(201).json({ message: "Producto creado" });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Producto ${id} actualizado` });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Producto ${id} eliminado` });
});

module.exports = router;
