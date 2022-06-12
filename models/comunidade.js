const { Schema, model } = require("../config/conexao");

const comunidadeSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    foto: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    aberta: { type: Boolean, required: true },
    totalParticipantes: { type: Number, required: true, default: 1 },
    created: { type: String, required: true, default: new Date().getTime() },
    updated: { type: String, required: false, default: null },
    finished: { type: String, required: false, default: null },
});

const comunidade = model("comunidades", comunidadeSchema);

module.exports = comunidade;