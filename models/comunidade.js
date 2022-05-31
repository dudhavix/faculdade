const mongoose = require("../config/conexao");

const comunidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    meta: {
        type: Number,
        required: true,
    },
    privacidade: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    admin: {
        type: String,
        required: true,
    },
    created: {
        type: String,
        required: true,
    },
    initiated: {
        type: String,
        required: true,
    },
    finished: {
        type: String,
        required: true,
    },
});

const comunidade = mongoose.model("comunidade", comunidadeSchema);

module.exports = comunidade;

