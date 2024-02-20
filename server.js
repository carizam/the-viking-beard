const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./src/routes/products");
const cartsRoutes = require("./src/routes/carts");
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Configuración de Mongoose para conectarse a MongoDB Atlas

const password = encodeURIComponent("HYPO987");
const mongoDBAtlasUri = `mongodb+srv://ciarizam:${password}@vikingbearddb.12u8the.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoDBAtlasUri)
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

// Rutas para productos
app.use("/api/products", productsRoutes);

// Rutas para carritos
app.use("/api/carts", cartsRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
