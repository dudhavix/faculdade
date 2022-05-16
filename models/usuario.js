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
    given_name: {
        type: String,
        required: true,
    },
    family_name: {
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
    email_verified: {
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
// sub: '109648348890999991353',
// name: 'Duda Santos',
// given_name: 'Duda',
// family_name: 'Santos',
// picture: 'https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c',
// email: 'dudu.amelhor@gmail.com',
// email_verified: true,
// locale: 'pt-BR'