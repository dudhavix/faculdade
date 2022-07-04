const { Schema, model } = require("../config/conexao");

const auditoriaSchema = new Schema({
    credenciais: { type: Schema.Types.Object, required: true },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
});

const auditoria = model("auditorias", auditoriaSchema);

module.exports = auditoria;