const usuarioComunidadeModel = require("./../models/usuario-comunidade");

module.exports = {
    create: async (usuario, comunidade) => {
        try {
            await usuarioComunidadeModel.create({usuario, comunidade});
            return true;
        } catch (error) {
            console.log('ERROR AO CRIAR RELAÇÃO USUÁRIO COMUNIDADE ====> ', error);
            return false;
        }
    },

    findAllUsuario: async (usuario) => {
        try {
            const arrayComunidadesUsuario = await usuarioComunidadeModel.find({usuario}, ["comunidade"]).populate('comunidade', ["nome", "descricao", "foto", "totalParticipantes"]);
            const usuarioComundiades = mapperFindAllUsuario(arrayComunidadesUsuario);
            return usuarioComundiades;
        } catch (error) {
            console.log('ERROR AO ENCONTRAR RELAÇÃO USUÁRIO COMUNIDADE ====> ', error);
            return false;
        }
    },

    findAllComunidade: async (comunidade) => {
        try {
            return usuarioComunidadeModel.find({comunidade}).populate("usuario", ["name", "picture"]);
        } catch (error) {
            console.log('ERROR AO ENCONTRAR RELAÇÃO USUÁRIO COMUNIDADE ====> ', error);
            return false;
        }
    },

    findRandomParticipantesComunidade: async (comunidade) => {
        try {
            return usuarioComunidadeModel.find({comunidade}, ["usuario"], { $sample: { size: 3 } }).populate("usuario", ["picture"]);
        } catch (error) {
            console.log('ERROR AO ENCONTRAR RELAÇÃO USUÁRIO COMUNIDADE ====> ', error);
            return false;
        }
    },

    delete: async (comunidade, usuario) => {
        try {
            return usuarioComunidadeModel.deleteOne({comunidade, usuario});
        } catch (error) {
            console.log('ERROR AO DELETAR RELAÇÃO USUÁRIO COMUNIDADE ====> ', error);
            return false;
        }
    },

    validExisteId: async (_id) => {
        const usuario = await usuarioComunidadeModel.findOne({..._id});
        if(usuario.length > 0){
            return true;
        }else{
            return false;
        }
    },
}

function mapperFindAllUsuario(arrayComunidadesUsuario) {
    const comunidades = [];
    arrayComunidadesUsuario.forEach(element => {
        comunidades.push(element.comunidade)
    });
    return comunidades;
}