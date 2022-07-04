const { Schema, model } = require("../config/conexao");

const desafioSchema = new Schema({
    comunidade: { type: Schema.Types.ObjectId, required: true, ref: "comunidades" },
    titulo: { type: Schema.Types.String, required: true },
    tipo: { type: Schema.Types.String, required: true },
    inicio: { type: Schema.Types.String, required: true },
    fim: { type: Schema.Types.String, required: false, default: null },
    meta: { type: Schema.Types.String, required: false, default: null },
    ganhador: { type: Schema.Types.ObjectId, required: false, ref: "usuarios", default: null },
    created: { type: Schema.Types.String, required: true, default: new Date().getTime() },
    updated: { type: Schema.Types.String, required: false, default: null },
    finished: { type: Schema.Types.String, required: false, default: null },
});

const desafio = model("desafios", desafioSchema);

module.exports = desafio;