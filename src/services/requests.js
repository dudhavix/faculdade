import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:3030/"
});

export default {
    // COMUNIDADE
    createComunidade: (comunidade) => {
        return http.post(`comunidade/create`, comunidade);
    },

    entrarComunidade: (comunidadeId) => {
        return http.get(`comunidade/entrar/${comunidadeId}`);
    },

    updateComunidade: (comunidade) => {
        return http.post(`comunidade/update`, comunidade);
    },

    deleteComunidade: (comunidadeId) => {
        return http.post(`comunidade/delete/${comunidadeId}`);
    },

    findByIdComunidade: (comunidadeId) => {
        return http.get(`comunidade/findById/${comunidadeId}`);
    },

    findByAllRandom: () => {
        return http.get(`comunidade/findByAllRandom`);
    },

    // USUÁRIO <> COMUNIDADE
    findByAllUsuario: () => {
        return http.get(`usuario-comunidade/findByAllUsuario`);
    },

    findByAllComunidade: (comunidadeId) => {
        return http.get(`usuario-comunidade/findByAllComunidade/${comunidadeId}`);
    },

    // HELPERS
    login: () => {
        return http.get(`login`)
    },
    
    carregarImagemComunidades: () => {
        return http.get(`carregar-img-comunidades`)
    },
}