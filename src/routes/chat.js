const express = require("express");
const router = express.Router();
const MessagesManager = require("../dao/mongoDB/messagesManager");

// Ruta para cargar la página de chat
router.get("/", async (req, res) => {
  try {
    const messages = await MessagesManager.getLimitedMessages(50); // Obtener los últimos 50 mensajes
    res.render("chat", { messages });
  } catch (error) {
    console.error("Error al cargar la página de chat:", error);
    res.status(500).send("Error al cargar la página de chat");
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await MessagesManager.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error("Error al cargar mensajes:", error);
    res.status(500).json({ error: "Error al cargar mensajes" });
  }
});

module.exports = router;
