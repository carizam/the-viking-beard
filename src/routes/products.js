const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Paginación, filtrado y ordenación
router.get("/", async (req, res) => {
  try {
    let { limit, page, sort, query } = req.query;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    sort = sort || "";

    let filterOptions = query ? { name: new RegExp(query, "i") } : {};
    let sortOptions =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

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
