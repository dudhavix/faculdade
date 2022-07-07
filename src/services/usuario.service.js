const helperLog = require("../config/helper-log");
const usuarioDesafioModel = require("../models/usuario-desafio.model");
const usuarioModel = require("../models/usuario.model");
const desafioService = require("./desafio.service");

module.exports = {
    create: async (usuario) => {
        try {
            await usuarioModel.create(usuario);
            return true;
        } catch (error) {
            helperLog.error("usuario_service", "create", error);
            return false;
        }
    },

    entrarComunidade: async (_id, idComunidade) => {
        try {
            await usuarioModel.updateOne({ _id }, { $set: { comunidade: idComunidade } });
            return true;
        } catch (error) {
            helperLog.error("usuario_service", "entrar_Comunidade", error);
            return false;
        }
    },

    sairComunidade: async (_id) => {
        try {
            await usuarioModel.updateOne({ _id }, { $set: { comunidade: null } });
            return true;
        } catch (error) {
            helperLog.error("usuario_service", "sair_Comunidade", error);
            return false;
        }
    },

    sairComunidadeManyUsuarios: async (idComunidade) => {
        try {
            await usuarioModel.updateMany({ comunidade: idComunidade }, { $set: { comunidade: null } });
            return true;
        } catch (error) {
            helperLog.error("usuario_service", "sair_Comunidade", error);
            return false;
        }
    },

    getForToken: async (sub) => {
        return usuarioModel.findOne({ sub }, ["_id", "sub"])
    },

    findByUser: async (_id) => {
        try {
            const usuario = await usuarioModel.findOne({ _id, excluded: null }, ["name", "picture", "email", "comunidade",]).populate("comunidade");
            if (!usuario.comunidade) {
                return { usuario }
            }
            const desafio = await desafioService.findByIdComunidade(usuario.comunidade._id);
            const participantes = await usuarioDesafioModel.find({ desafio: desafio._id, ativo: true }, ["usuario", "totalPassos"]).populate("usuario", ["name"]).sort({ totalPassos: -1 })
            return { usuario, desafio, participantes }
        } catch (error) {
            helperLog.error("usuario_service", "find_By_User", error);
            return false;
        }

    },

    findRandomParticipantesComunidade: async (idComunidade) => {
        try {
            return usuarioModel.find({ comunidade: idComunidade }, ["picture"], { $sample: { size: 3 } });
        } catch (error) {
            helperLog.error("usuario_service", "find_Random_Participantes_Comunidade", error);
            return false;
        }
    },

    findParticipantesComunidade: async (idComunidade) => {
        try {
            return usuarioModel.find({ comunidade: idComunidade }, [""]);
        } catch (error) {
            helperLog.error("usuario_service", "find_Participantes_Comunidade", error);
            return false;
        }
    },

    findByComunidade: async (idComunidade) => {
        try {
            return usuarioModel.find({ comunidade: idComunidade }, ["_id"]);
        } catch (error) {
            helperLog.error("usuario_service", "find_By_Comunidade", error);
            return false;
        }

    },

    validExisteId: async (_id) => {
        return usuarioModel.exists({ _id, excluded: null });
    },

    validExisteSub: async (sub) => {
        return usuarioModel.exists({ sub, excluded: null });
    },

    validEntrarComunidade: async (idUsuario) => {
        const usuario = await usuarioModel.findById(idUsuario);
        return usuario.comunidade
    },
}