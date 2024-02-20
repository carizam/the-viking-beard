const express = require("express");
const mongoose = require("mongoose");
const productsRoutes = require("./src/routes/products");
const cartsRoutes = require("./src/routes/carts");
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Configuración de Mongoose para conectarse a MongoDB Atlas
const mongoDBAtlasUri =
  "mongodb+srv://ciarizam:<password>@vikingbearddb.12u8the.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoDBAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error(err));

// Rutas para productos
app.use("/api/products", productsRoutes);

// Rutas para carritos
app.use("/api/carts", cartsRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8080; // Usar variable de entorno para el puerto o 8080 como predeterminado
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
