const comunidade_model = require("./../models/comunidade")

module.exports = {
    createComunidade: async function(comunidade, res){
        try {
            await comunidade_model.create(comunidade);
            res.status(204).send();
        } catch (error) {
            res.status(400).send(error); 
        }
    },

    getComunidades: async function(res){
        try {
            const comunidades = await comunidade_model.find({status: "ATIVO", privacidade: "PUBLICO"});
            res.send(comunidades);
        } catch (error) {
            res.status(400).send(error); 
        }
    }
}