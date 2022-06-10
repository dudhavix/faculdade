const comunidade_model = require("./../models/comunidade")
const comunidadeUsuario_model = require("./../models/comunidade-usuario")

module.exports = {
    createComunidade: async function(comunidade, res){
        try {
            const newComunidade = await comunidade_model.create(comunidade);
            await comunidadeUsuario_model.create({
                usuario: newComunidade.admin,
                comunidade: newComunidade._id,
                posicao: 0,
                totalPassos: 0
            });
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error); 
        }
    },

    getComunidades: async function(res){
        try {
            let comunidades = await comunidade_model.find({status: "ATIVO", status: "INICIADO", privacidade: "PUBLICO"});
            comunidades = comunidades.filter(comunidade => {
                
            })
            res.send(comunidades);
        } catch (error) {
            res.status(400).send(error); 
        }
    },

    getMyComunidades: async function(_id, res){
        try {
            const comunidades = await comunidadeUsuario_model.find({usuario: _id}).populate("comunidade");
            res.send(comunidades);
        } catch (error) {
            console.log("erro => ", error);
            res.status(400).send(error); 
        }
    },

    getMyComunidadesAdmin: async function(admin, res){
        try {
            const comunidades = await comunidade_model.find({privacidade: "PRIVADO", admin});
            res.send(comunidades);
        } catch (error) {
            res.status(400).send(error); 
        }
    },

    getComunidade: async function(_id, res){
        try {
            const comunidades = await comunidade_model.findOne({status: "ATIVO", _id});
            res.send(comunidades);
        } catch (error) {
            res.status(400).send(error); 
        }
    },

    deleteComunidade: async function(_id, admin, res){
        try {
            await comunidade_model.deleteOne({status: "ATIVO", _id, admin});
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error); 
        }
    },

    updateComunidade: async function(updateDados, res){
        try {
            await comunidade_model.updateOne({status: "ATIVO", admin: updateDados.admin, _id: updateDados._id}, {$set: updateDados});
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error); 
        }
    },

    
}