const Message = require("../models/message");

class MessagesManager {
  // Obtener todos los mensajes
  async getAllMessages() {
    try {
      const messages = await Message.find().sort({ timestamp: -1 }); // Ordenar por fecha
      return messages;
    } catch (error) {
      throw new Error("Error al obtener mensajes: " + error.message);
    }
  }

  async getLimitedMessages(limit = 50) {
    try {
      const messages = await Message.find()
        .sort({ timestamp: -1 })
        .limit(limit);
      return messages;
    } catch (error) {
      throw new Error("Error al obtener mensajes: " + error.message);
    }
  }

  // Guardar un nuevo mensaje
  async addMessage(messageData) {
    try {
      const message = new Message(messageData);
      const savedMessage = await message.save();
      return savedMessage;
    } catch (error) {
      throw new Error("Error al guardar mensaje: " + error.message);
    }
  }
}

module.exports = new MessagesManager();
