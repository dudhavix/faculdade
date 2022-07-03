const { Schema, model } = require("../config/conexao");

const comunidadeSchema = new Schema({
    nome: { type: Schema.Types.String, required: true },
    descricao: { type: Schema.Types.String, required: true },
    foto: { type: Schema.Types.String, required: true },
    admin: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    aberta: { type: Schema.Types.Boolean, required: true },
    totalParticipantes: { type: Schema.Types.Number, required: true, default: 1 },
    created: { type: Schema.Types.String, required: true, default: new Date().getTime() },
    updated: { type: Schema.Types.String, required: false, default: null },
    finished: { type: Schema.Types.String, required: false, default: null },
});

const comunidade = model("comunidades", comunidadeSchema);

module.exports = comunidade;