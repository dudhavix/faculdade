const helperLog = require("../config/helper-log");
const desafioModel = require("../models/desafio.model");
const usuarioDesafioModel = require("../models/usuario-desafio.model");
const usuarioService = require("./usuario.service");

module.exports = {
    create: async (desafio) => {
        try {
            const podeCriar = await desafioModel.findOne({comundiade: desafio.comunidade, finished: null});

            if(podeCriar){
                helperLog.warning("desafio_service", "create", "ja tem um desafio ativo");
                return 1;
            }

            const usuariosComunidade = await usuarioService.findParticipantesComunidade(desafio.comunidade);
            const newDesafio = await desafioModel.create(desafio);

            usuariosComunidade.forEach(element => {
                usuarioDesafioModel.create({usuario: element._id, desafio: newDesafio._id})
            });
            
            return true;
        } catch (error) {
            helperLog.error("desafio_service", "create", error);
            return false;
        }
    },

    findByIdComunidade: async (idComundiade) => {
        return desafioModel.find({comundiade: idComundiade, finished: null}).populate("ganhador", ["name", "picture"])
    },

    findAll: async () => {
        return desafioModel.find({finished: null});
    },

    finalizar: async (idDesafio) => {
        try {
            await desafioModel.updateOne({_id: idDesafio}, { $set: {finished: new Date().getTime()}});
            await usuarioDesafioModel.updateOne({_id: idDesafio}, { $set: {ativo: false}});
            return true;
        } catch (error) {
            helperLog.error("desafio_service", "finalizar", error);
            return false;
        }
    },

    atualizarPassos: async (idDesafio, idUsuario, totalPassos) => {
        try {
            await usuarioDesafioModel.updateOne({desafio: idDesafio, usuario: idUsuario, ativo: true}, { $set: {totalPassos}});
            return true;
        } catch (error) {
            helperLog.error("desafio_service", "atualizarPassos", error);
            return false;
        }
    },
}