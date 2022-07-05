const helperLog = require("../config/helper-log");
const desafioModel = require("../models/desafio.model");
const usuarioDesafioModel = require("../models/usuario-desafio.model");
const usuarioService = require("./usuario.service");

module.exports = {
    create: async (desafio) => {
        try {
            const podeCriar = await desafioModel.findOne({ comunidade: desafio.comunidade, finished: null });

            if (podeCriar) {
                helperLog.warning("desafio_service", "create", "ja tem um desafio ativo");
                return 1;
            }

            const usuariosComunidade = await usuarioService.findParticipantesComunidade(desafio.comunidade);
            const newDesafio = await desafioModel.create(desafio);

            usuariosComunidade.forEach(element => {
                usuarioDesafioModel.create({ usuario: element._id, desafio: newDesafio._id })
            });

            return true;
        } catch (error) {
            helperLog.error("desafio_service", "create", error);
            return false;
        }
    },

    findByIdComunidade: async (idComundiade) => {
        return desafioModel.find({ comundiade: idComundiade, finished: null }).populate("ganhador", ["name", "picture"])
    },

    findAll: async () => {
        return desafioModel.find({ finished: null });
    },

    findAll: async () => {
        return desafioModel.find({ finished: null });
    },

    findAllFinishedAteOFim: async (dataHoje) => {
        return desafioModel.find({ finished: null, fim: dataHoje, tipo: "ate_o_fim" });
    },

    findAllFinishedAteOLimite: async () => {
        return desafioModel.find({ finished: null, fim: null, tipo: "ate_o_limite" });
    },

    finalizar: async (desafio) => {
        try {
            let finalizarDesafio = true;
            const ganhador = await verificarGanhador(desafio._id);

            if(desafio.tipo == "ate_o_limite"){
                finalizarDesafio = Number(ganhador.totalPassos) >= Number(desafio.meta);
            }

            if(finalizarDesafio){
                await desafioModel.updateOne({ _id: desafio._id }, { $set: { finished: new Date().getTime(), ganhador: ganhador.usuario } });
                await usuarioDesafioModel.updateMany({ desafio: desafio._id }, { $set: { ativo: false } });
            }
        } catch (error) {
            helperLog.error("desafio_service", "finalizar", error);
        }
    },

    atualizarPassos: async (idDesafio, idUsuario, totalPassos) => {
        try {
            await usuarioDesafioModel.updateOne({ desafio: idDesafio, usuario: idUsuario, ativo: true }, { $set: { totalPassos } });
            return true;
        } catch (error) {
            helperLog.error("desafio_service", "atualizarPassos", error);
            return false;
        }
    },
}

async function verificarGanhador(idDesafio) {
    const usuariosDesafio = await usuarioDesafioModel.find({ desafio: idDesafio, ativo: true });

    let maiorNumero = 0
    let ganhador;

    for (const participante of usuariosDesafio) {
        if (participante.totalPassos > maiorNumero) {
            maiorNumero = participante.totalPassos;
            ganhador = participante
        }
    }

    return ganhador;
}