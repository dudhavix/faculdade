const comunidadeModel = require("./../models/comunidade");
const usuarioComundiadeService = require("./usuario-comunidade");

module.exports = {
    create: async function(comunidade){
        try {
            const newComunidade = await comunidadeModel.create(comunidade);
            await usuarioComundiadeService.create(newComunidade.admin, newComunidade._id);
            return true;
        } catch (error) {
            console.log('ERROR AO CRIAR COMUNIDADE ====> ', error)
            return false
        }
    },

    update: async function(comunidade, usuarioId){
        try {
            const validExisteId =  await comunidadeModel.findOne({_id: comunidade, admin: usuarioId});
            if(validExisteId){
                await comunidadeModel.updateOne({_id: comunidade._id}, {$set: {...comunidade, updated: new Date().getTime()}});
                return true;
            }
            console.log('NÃO ENCONTROU A COMUNIDADE<>ADMIN')
            return false
        } catch (error) {
            console.log('ERROR AO ATUALIZAR COMUNIDADE ====> ', error)
            return false
        }
    },

    delete: async function(comunidadeId, usuarioId){
        try {
            const validExisteId =  await comunidadeModel.findOne({_id: comunidadeId, admin: usuarioId});
            if(validExisteId){
                //await comunidadeModel.updateOne({_id: comunidadeId}, {$set: {finished: new Date().getTime()}});
                await usuarioComundiadeService.delete(comunidadeId, usuarioId);
                await comunidadeModel.deleteOne({_id: comunidadeId, admin: usuarioId});
                return true;
            }
            console.log('NÃO ENCONTROU A COMUNIDADE<>ADMIN')
            return false
        } catch (error) {
            console.log('ERROR AO ATUALIZAR COMUNIDADE ====> ', error)
            return false
        }
    },

    findAll: async function(){
        try {
            return comunidadeModel.find();
        } catch (error) {
            return false
        }
    },

    findAllRandom: async function(usuarioId){
        try {
            const comundiades = await comunidadeModel.aggregate([{ $match: { aberta: true } },{ $sample: { size: 3 } }]);
            const comunidadesRandom = comundiades.filter(element => {
                return element.admin != usuarioId;
            })
            return comunidadesRandom;
        } catch (error) {
            return false
        }
    },

    findById: async function(comunidadeId){
        try {
            const comunidades = await comunidadeModel.findOne({_id: comunidadeId}).populate("admin", ["name", "picture"]);
            const participantes = await usuarioComundiadeService.findRandomParticipantesComunidade(comunidadeId);
            return {comunidades, participantes}
        } catch (error) {
            console.log('ERROR AO RETORNAR COMUNIDADE ====> ', error)
            return false
        }
    },

    atualizarTotalParticipantes: async function(comunidadeId){
        const comunidade =  await comunidadeModel.findOne({_id: comunidadeId});
        await comunidadeModel.updateOne({_id: comunidadeId}, {$set: {totalParticipantes: comunidade.totalParticipantes+1}})
    }
}