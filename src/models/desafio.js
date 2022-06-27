const { Schema, model } = require("../config/conexao");

const desafioSchema = new Schema({
    comunidade: { type: Schema.Types.ObjectId, required: true, ref: "comunidades" },
    titulo: { type: String, required: true },
    tipo: { type: String, required: true },
    inicio: { type: String, required: true },
    fim: { type: String, required: false },
    meta: { type: String, required: false },
    ganhador: { type: Schema.Types.ObjectId, required: false, ref: "usuarios" },
    created: { type: String, required: true },
    updated: { type: String, required: false },
    finished: { type: String, required: false },
});

const desafio = model("desafios", desafioSchema);

module.exports = desafio;