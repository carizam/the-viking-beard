const express = require("express");
const router = express.Router();

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

module.exports = router;
