const helperLog = require("../config/helper-log");
const comunidadeModel = require("../models/comunidade.model");
const usuarioService = require("./usuario.service");


module.exports = {
    create: async function(comunidade){
        try {
            const newComunidade = await comunidadeModel.create(comunidade);
            await usuarioService.entrarComunidade(newComunidade.admin, newComunidade._id);
            return true;
        } catch (error) {
            helperLog.error("comunidadeService", "create", error);
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
            helperLog.warning("comunidadeService", "update", "nenhuma comunidade encontrada");
            return false;
        } catch (error) {
            helperLog.error("comunidadeService", "update", error);
            return false;
        }
    },

    delete: async function(comunidadeId, usuarioId){
        try {
            const validExisteId =  await comunidadeModel.findOne({_id: comunidadeId, admin: usuarioId});
            if(validExisteId){
                await usuarioService.sairComunidadeManyUsuarios(comunidadeId);
                await comunidadeModel.deleteOne({_id: comunidadeId, admin: usuarioId});
                return true;
            }
            helperLog.warning("comunidadeService", "delete", "nenhuma comunidade encontrada");
            return false;
        } catch (error) {
            helperLog.error("comunidadeService", "findByRandom", error);
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
            const comundiades = await comunidadeModel.aggregate([{ $match: { aberta: true } },{ $sample: { size: 10 } }]);
            const comunidadeUsuario = await usuarioService.validEntrarComunidade(usuarioId);

            const comunidadesRandom = comundiades.filter(element => {
                if((element.admin != usuarioId) && (element._id.toString() != comunidadeUsuario.toString())) return element;
            })
            return comunidadesRandom;
        } catch (error) {
            helperLog.error("comunidade_Service", "find_By_Random", error);
            return false;
        }
    },

    findById: async function(comunidadeId){
        try {
            const comunidade = await comunidadeModel.findOne({_id: comunidadeId}).populate("admin", ["name", "picture"]);
            const participantes = await usuarioService.findRandomParticipantesComunidade(comunidadeId);
            return {comunidade, participantes}
        } catch (error) {
            helperLog.error("comunidade_Service", "find_By_Id", error);
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