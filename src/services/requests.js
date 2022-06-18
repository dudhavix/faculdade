import axios from 'axios';
import store from '../store';

const http = axios.create({
    baseURL: store.state.hostServidor
});

export default {
    // COMUNIDADE
    createComunidade: (comunidade) => {
        return http.post(`comunidade/create`, comunidade, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    entrarComunidade: (comunidadeId) => {
        return http.get(`comunidade/entrar/${comunidadeId}`, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    sairComunidade: (comunidadeId) => {
        return http.get(`comunidade/sair/${comunidadeId}`, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    updateComunidade: (comunidade) => {
        return http.put(`comunidade/update`, comunidade, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    deleteComunidade: (comunidadeId) => {
        return http.delete(`comunidade/delete/${comunidadeId}`, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    findByIdComunidade: (comunidadeId) => {
        return http.get(`comunidade/findById/${comunidadeId}`, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    findByRandom: () => {
        return http.get(`comunidade/findByRandom`, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    // USUÁRIO <> COMUNIDADE
    findByAllUsuario: () => {
        return http.get(`usuario-comunidade/findByAllUsuario`, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
    },

    findByAllComunidade: (comunidadeId) => {
        return http.get(`usuario-comunidade/findByAllComunidade/${comunidadeId}`, {
            headers: {
                Authorization: `Bearer ${store.getters.getToken}`
            }
        });
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