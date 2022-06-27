const usuario_model = require("./../models/usuario");

module.exports = {
    create: async (usuario) => {
        try {
            await usuario_model.create(usuario);
            return true;
        } catch (error) {
            console.log('ERROR AO CRIAR USUÁRIO ====> ', error)
            return false;
        }
    },

    findBySub: async (sub) => {
        return usuario_model.findOne({...sub}, ["name", "picture", "email"])
    },

    validExisteId: async (_id) => {
        const usuario = await usuario_model.findOne({..._id});
        usuario ? true : false;
    },
}