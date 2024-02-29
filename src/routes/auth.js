// src/routes/auth.js

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

// Ruta de registro
router.post("/api/sessions/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      age: req.body.age,
      password: hashedPassword,
    });
    await user.save();
    req.session.user = user; // Guardar el usuario en la sesión
    res.redirect("/profile"); // Redirige a la vista de perfil
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Ruta de inicio de sesión
router.post("/api/sessions/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.user = user; // Guardar el usuario en la sesión
      res.redirect("/profile"); // Redirige a la vista de perfil
    } else {
      res.status(401).send("Credenciales incorrectas");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
