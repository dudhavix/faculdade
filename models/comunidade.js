const { Schema, model } = require("../config/conexao");

const comunidadeSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    meta: { type: Number, required: true },
    privacidade: { type: String, required: true },
    status: { type: String, required: true },
    admin: { type: String, required: true },
    created: { type: String, required: true },
    initiated: { type: String, required: true },
    finished: { type: String, required: true },
});

const comunidade = model("comunidades", comunidadeSchema);

module.exports = comunidade;

// {
//     "nome": "Unisales TI",
//     "descricao": "Deserunt consequuntur et distinctio vitae provident enim accusantium ab dolor fugiat dolore ipsum fugit aliquam ipsam numquam omnis minus non, iste expedita",
//     "meta": 45000,
//     "privacidade": "PUBLICO",
//     "status": "ATIVO",
//     "admin": ""
//     "created": "",
//     "initiated": "30/05/2022 00:00:00",
//     "finished": "31/05/2022 23:59:59"
// }