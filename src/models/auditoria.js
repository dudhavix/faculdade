const { Schema, model } = require("../config/conexao");

const auditoriaSchema = new Schema({
    accessToken: { type: String, required: true },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    created: { type: String, required: true, default: new Date().getTime() },
    finished: { type: String, required: false, default: null },
});

const auditoria = model("auditorias", auditoriaSchema);

module.exports = auditoria;