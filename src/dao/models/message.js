const mongoose = require("mongoose");

// Esquema de mensajes
const messageSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      match: /.+@.+\..+/,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Modelo de mensajes
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
