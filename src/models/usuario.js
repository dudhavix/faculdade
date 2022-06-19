const mongoose = require("../config/conexao");

const usuarioSchema = new mongoose.Schema({
    sub: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String, required: true },
    locale: { type: String, required: true },
    created: { type: String, required: true, default: new Date().getTime() },
    updated: { type: String, required: false, default: null},
    excluded: { type: String, required: false, default: null},
});

const usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = usuario;