const express = require("express");
const productsRoutes = require("./src/routes/products");
const cartsRoutes = require("./src/routes/carts");
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Ruta productos
app.use("/api/products", productsRoutes);

// Ruta  carritos
app.use("/api/carts", cartsRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
