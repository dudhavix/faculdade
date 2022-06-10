const { Schema, model } = require("../config/conexao");

const comunidadeUsuarioSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    comunidade: { type: Schema.Types.ObjectId, required: true, ref: "comunidades" },
    posicao: { type: Number, required: true },
    totalPassos: { type: Number, required: true },
});

const comunidadeUsuario = model("comunidade-usuario", comunidadeUsuarioSchema);

module.exports = comunidadeUsuario;