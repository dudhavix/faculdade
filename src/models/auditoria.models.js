const { Schema, model } = require("../config/conexao");

const auditoriaSchema = new Schema({
    credenciais: { type: Schema.Types.Object, required: true },
    usuario: { type: Schema.Types.ObjectId, required: true, ref: "usuarios" },
    createdAt: { type: Schema.Types.Date, expires: "1d", default: new Date().getTime(), index: true }
});

const auditoria = model("auditorias", auditoriaSchema);

module.exports = auditoria;