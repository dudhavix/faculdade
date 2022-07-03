const { Schema, model } = require("../config/conexao");

const usuarioComunidadeSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    comunidade: { type: Schema.Types.ObjectId, required: true, ref: "comunidades" },
    ativo: { type: Schema.Types.Boolean, required: true, default: true },
});

const usuarioComunidade = model("usuarios-comunidades", usuarioComunidadeSchema);

module.exports = usuarioComunidade;