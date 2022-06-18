const usuarioComunidadeModel = require("./../models/usuario-comunidade");
const logger = require("../config/helper-log")

module.exports = {
    create: async (usuario, comunidade) => {
        try {
            await usuarioComunidadeModel.create({usuario, comunidade});
            return true;
        } catch (error) {
            logger.error("usuarioComunidadeService", "create", error);
            return false;
        }
    },

    findAllUsuario: async (usuario) => {
        try {
            const arrayComunidadesUsuario = await usuarioComunidadeModel.find({usuario}, ["comunidade"]).populate('comunidade', ["nome", "descricao", "foto", "totalParticipantes"]);
            const usuarioComundiades = mapperFindAllUsuario(arrayComunidadesUsuario);
            return usuarioComundiades;
        } catch (error) {
            logger.error("usuarioComunidadeService", "findAllUsuario", error);
            return false;
        }
    },

    findAllComunidade: async (comunidade) => {
        try {
            return usuarioComunidadeModel.find({comunidade}).populate("usuario", ["name", "picture"]);
        } catch (error) {
            logger.error("usuarioComunidadeService", "findAllComunidade", error);
            return false;
        }
    },

    findRandomParticipantesComunidade: async (comunidade) => {
        try {
            return usuarioComunidadeModel.find({comunidade}, ["usuario"], { $sample: { size: 3 } }).populate("usuario", ["picture"]);
        } catch (error) {
            logger.error("usuarioComunidadeService", "findRandomParticipantesComunidade", error);
            return false;
        }
    },

    delete: async (usuario, comunidade) => {
        try {
            return usuarioComunidadeModel.deleteOne({comunidade, usuario});
        } catch (error) {
            logger.error("usuarioComunidadeService", "delete", error);
            return false;
        }
    },

    deleteMany: async (comunidade) => {
        try {
            return usuarioComunidadeModel.deleteMany({comunidade});
        } catch (error) {
            logger.error("usuarioComunidadeService", "deleteMany", error);
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