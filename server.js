require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./src/routes/products");
const cartsRoutes = require("./src/dao/models/cart");
const app = express();

app.use(express.json()); // Middleware para parsear JSON

const password = encodeURIComponent(process.env.DB_PASS);
const mongoDBAtlasUri = `mongodb+srv://${process.env.DB_USER}:${password}@${process.env.DB_HOST}/mydatabase?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDBAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Opcional: Manejo de errores de conexión inicial y reconexión
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1); // Opcional: termina el proceso en caso de un error de conexión
});

// Opcional: Evento de reconexión (útil para el seguimiento)
mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected!");
});

// Rutas para carritos
app.use("/api/carts", cartsRoutes);

// Rutas para productos
app.use("/api/products", productsRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
