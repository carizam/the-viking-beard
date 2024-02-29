require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const productsRoutes = require("./src/routes/products");
const cartsRoutes = require("./src/routes/carts");
const authRoutes = require("./src/routes/auth");
const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Configuración de la sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

try {
  const password = encodeURIComponent(process.env.DB_PASS);

  if (!process.env.DB_USER || !process.env.DB_PASS || !process.env.DB_HOST) {
    throw new Error("Error en las variables DB_USER, DB_PASS y DB_HOST");
  }

  // Construye la URI de conexión a MongoDB
  const mongoDBAtlasUri = `mongodb+srv://${process.env.DB_USER}:${password}@${process.env.DB_HOST}/mydatabase?retryWrites=true&w=majority`;

  mongoose.connect(mongoDBAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.error("Error al configurar la conexión a MongoDB:", err);
  process.exit(1);
}

mongoose.connection.on("connected", () => {
  console.log("Conexión a MongoDB establecida con éxito");
});
mongoose.connection.on("error", (err) => {
  console.error("Error en la conexión a MongoDB:", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Desconectado de MongoDB");
});
mongoose.connection.on("reconnected", () => {
  console.log("Reconectado a MongoDB");
});

// Rutas para carritos
app.use("/api/carts", cartsRoutes);

// Rutas para productos
app.use("/api/products", productsRoutes);

// Ritas de autentication
app.use("/", authRoutes);

//Rutas de vistas
app.use("/", viewRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
