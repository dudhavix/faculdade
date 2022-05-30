const mongoose = require("../config/conexao");

const usuarioSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    locale: {
        type: String,
        required: true,
    },
});

const usuario = mongoose.model("usuarios", usuarioSchema);

module.exports = usuario;