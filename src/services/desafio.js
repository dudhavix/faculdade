const helperLog = require("../config/helper-log");
const desafio_model = require("./../models/desafio");

module.exports = {
    create: async (desafio) => {
        try {
            await desafio_model.create({
                ...desafio,
                created: new Date().toLocaleDateString()
            });
            return true;
        } catch (error) {
            helperLog.error("desafio service", "create", error);
            return false;
        }
    },

    findByIdComunidade: async (idComundiade) => {
        return desafio_model.find({comundiade: idComundiade}).populate("ganhador", ["name", "picture"])
    },
}