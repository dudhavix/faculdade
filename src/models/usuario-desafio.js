const { Schema, model } = require("../config/conexao");

const usuarioDesafioSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    desafio: { type: Schema.Types.ObjectId, required: true, ref: "desafios" },
    totalPassos: { type: Number, required: true, default: 0 },
});

const usuarioDesafio = model("comunidade-usuario", usuarioDesafioSchema);

module.exports = usuarioDesafio;