const { Schema, model } = require("../config/conexao");

const usuarioDesafioSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    desafio: { type: Schema.Types.ObjectId, required: true, ref: "desafios" },
    totalPassos: { type: Schema.Types.Number, required: true, default: 0 },
    ativo: { type: Schema.Types.Boolean, required: true, default: true },
});

const usuarioDesafio = model("usuarios-desafios", usuarioDesafioSchema);

module.exports = usuarioDesafio;