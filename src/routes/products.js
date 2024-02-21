const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Paginación
router.get("/", async (req, res) => {
  try {
    let { limit, page, sort, query, category, available } = req.query;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    // Filtros base
    let filterOptions = query ? { name: new RegExp(query, "i") } : {};

    // Filtrar por categoría si se proporciona
    if (category) {
      filterOptions.category = category;
    }

    // Filtrar por disponibilidad si se proporciona
    if (available !== undefined) {
      filterOptions.available = available === "true";
    }

    // Opciones de ordenación mejoradas
    let sortOptions = {};
    if (sort) {
      switch (sort.toLowerCase()) {
        case "price_asc": // Ordenar por precio ascendente
          sortOptions.price = 1;
          break;
        case "price_desc": // Ordenar por precio descendente
          sortOptions.price = -1;
          break;
      }
    }

    const productos = await Product.find(filterOptions)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort(sortOptions);

    const totalItems = await Product.countDocuments(filterOptions);
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      status: "success",
      payload: productos,
      totalPages: totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink:
        page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
      nextLink:
        page < totalPages
          ? `/api/products?page=${page + 1}&limit=${limit}`
          : null,
    });
  } catch (error) {
    res.status(500).send("Error al leer los productos: " + error.message);
  }
});

module.exports = router;
