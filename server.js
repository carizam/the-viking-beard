const express = require("express");
const productsRoutes = require("./src/routes/products");
const app = express();

app.use(express.json());

// Rutas para todos los productos
app.use("/api/products", productsRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor  en el puerto ${PORT}`));
