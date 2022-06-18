const logger = require("../config/helper-log");
const comunidadeModel = require("./../models/comunidade");
const usuarioComundiadeService = require("./usuario-comunidade");


module.exports = {
    create: async function(comunidade){
        try {
            const newComunidade = await comunidadeModel.create(comunidade);
            await usuarioComundiadeService.create(newComunidade.admin, newComunidade._id);
            return true;
        } catch (error) {
            logger.error("comunidadeService", "create", error);
            return false;
        }
    },

    update: async function(comunidade, usuarioId){
        try {
            const validExisteId =  await comunidadeModel.findOne({_id: comunidade, admin: usuarioId});
            if(validExisteId){
                await comunidadeModel.updateOne({_id: comunidade._id}, {$set: {...comunidade, updated: new Date().getTime()}});
                return true;
            }
            logger.warning("comunidadeService", "update", "nenhuma comunidade encontrada");
            return false;
        } catch (error) {
            logger.error("comunidadeService", "update", error);
            return false;
        }
    },

    delete: async function(comunidadeId, usuarioId){
        try {
            const validExisteId =  await comunidadeModel.findOne({_id: comunidadeId, admin: usuarioId});
            if(validExisteId){
                //await comunidadeModel.updateOne({_id: comunidadeId}, {$set: {finished: new Date().getTime()}});
                await usuarioComundiadeService.deleteMany(comunidadeId);
                await comunidadeModel.deleteOne({_id: comunidadeId, admin: usuarioId});
                return true;
            }
            logger.warning("comunidadeService", "delete", "nenhuma comunidade encontrada");
            return false;
        } catch (error) {
            logger.error("comunidadeService", "findByRandom", error);
            return false;
        }
    },

    findAll: async function(){
        try {
            return comunidadeModel.find();
        } catch (error) {
            return false
        }
    },

    findByRandom: async function(usuarioId){
        try {
            const comundiades = await comunidadeModel.aggregate([{ $match: { aberta: true } },{ $sample: { size: 3 } }]);
            const comunidadesRandom = comundiades.filter(element => {
                return element.admin != usuarioId;
            })
            return comunidadesRandom;
        } catch (error) {
            logger.error("comunidadeService", "findByRandom", error);
            return false;
        }
    },

    findById: async function(comunidadeId){
        try {
            const comunidade = await comunidadeModel.findOne({_id: comunidadeId}).populate("admin", ["name", "picture"]);
            const participantes = await usuarioComundiadeService.findRandomParticipantesComunidade(comunidadeId);
            return {comunidade, participantes}
        } catch (error) {
            logger.error("comunidadeService", "findById", error);
            return false;
        }
    },

    atualizarTotalParticipantes: async function(comunidadeId, entrada){
        const comunidade =  await comunidadeModel.findOne({_id: comunidadeId});
        if(entrada){
            await comunidadeModel.updateOne({_id: comunidadeId}, {$set: {totalParticipantes: comunidade.totalParticipantes+1}})
        }else{
            await comunidadeModel.updateOne({_id: comunidadeId}, {$set: {totalParticipantes: comunidade.totalParticipantes-1}})
        }
    }
}