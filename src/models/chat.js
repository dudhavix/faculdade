const { Schema, model } = require("../config/conexao");

const chatSchema = new Schema({
    comunidade: { type: Schema.Types.ObjectId, required: true, ref: "comunidades" },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    message: { type: String, required: true },
    created: { type: Date, required: true },
});

const chat = model("chats", chatSchema);

module.exports = chat;