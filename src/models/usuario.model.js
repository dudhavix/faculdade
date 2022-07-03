const { Schema, model } = require("../config/conexao");

const usuarioSchema = new Schema({
    sub: { type: Schema.Types.String, required: true, unique: true },
    name: { type: Schema.Types.String, required: true },
    picture: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    locale: { type: Schema.Types.String, required: true },

    comunidade: { type: Schema.Types.ObjectId, required: false, default: null, ref: "comunidades" },

    created: { type: Schema.Types.String, required: true, default: new Date().getTime() },
    updated: { type: Schema.Types.String, required: false, default: null },
    excluded: { type: Schema.Types.String, required: false, default: null },
});

const usuario = model("usuarios", usuarioSchema);

module.exports = usuario;