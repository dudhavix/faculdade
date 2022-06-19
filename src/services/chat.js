const logger = require("../config/helper-log");
const chatModel = require("./../models/chat");

module.exports = {
    create: async (chat) => {
        try {
            const novoChat = await chatModel.create(chat);
            const message = await chatModel.findById(novoChat._id).populate("usuario", ["name", "picture"]);
            return message;
        } catch (error) {
            logger.error("chatService", "create", error);
            return false;
        }
    },

    findAll: async (idComunidade) => {
        try {
            return chatModel.find({comunidade: idComunidade}).populate("usuario", ["name", "picture"]).limit(20);
        } catch (error) {
            logger.error("chatService", "findAll", error);
            return false;
        }
    },
}