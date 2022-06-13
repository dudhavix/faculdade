import axios from 'axios';

const http = axios.create({
    baseURL: "http://localhost:5000/"
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
        return http.put(`comunidade/update`, comunidade);
    },

    deleteComunidade: (comunidadeId) => {
        return http.delete(`comunidade/delete/${comunidadeId}`);
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

    logout: () => {
        return http.get(`logout`)
    },
    
    carregarImagemComunidades: () => {
        return http.get(`carregar-img-comunidades`)
    },
}