const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authMiddleware");

// Ruta para la página de registro
router.get("/register", (req, res) => {
  res.render("register");
});

// Ruta para la página de login
router.get("/login", (req, res) => {
  res.render("login");
});

// Ruta para la página de perfil del usuario
router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("profile", { user: req.session.user });
});

// Ruta para la página de perfil del usuario, protegida por el middleware
router.get("/profile", isAuthenticated, (req, res) => {
  // Si el middleware no redirige al usuario, renderiza la página de perfil
  res.render("profile", { user: req.session.user });
});

module.exports = router;

module.exports = router;
