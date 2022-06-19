const { Schema, model } = require("../config/conexao");

const usuarioComunidadeSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    comunidade: { type: Schema.Types.ObjectId, required: true, ref: "comunidades" },
});

const usuarioComunidade = model("usuarios-comunidades", usuarioComunidadeSchema);

module.exports = usuarioComunidade;