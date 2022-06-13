import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hostServidor: "http://localhost:3030/",
        token: null,
        
        usuario: {
            _id: "62a5fb97077abf1b25dba9ac",
            name: "Taiga Aisaka",
            picture: "https://th.bing.com/th/id/OIP.cTfc8VzeHusOu1pRb8bznwHaHa?pid=ImgDet&rs=1",
        },

        perfilComunidade: {
            comunidade: null,
            carregando: true,
            entrar: false
        },

        chatComunidade: {
            idChat: null,
            nome: null,
            carregando: true,
            conversa: null
        },

        alertas: []


    },
    mutations: {
        abrirPerfilComunidade(state, payload){
            state.perfilComunidade = payload;
        },

        fecharPerfilComunidade(state){
            state.perfilComunidade = {
                carregando: true,
                entrar: false,
                comunidadeSelecionada: null,
            };
        },

        abrirChatComunidade(state, payload){
            state.chatComunidade = payload;
        },

        fecharChatComunidade(state){
            state.chatComunidade = {
                idChat: null,
                carregando: true,
                conversa: null
            };
        },

        addConversaChatComunidade(state, payload){
            state.chatComunidade.conversa.push(payload);
        },

        addAlerta(state, payload){
            state.alertas.push({...payload, id: new Date().getTime()});
        },

        removerAlerta(state, payload){
            const alertas = state.alertas.filter(ele => {
                return ele.id != payload;
            });
            state.alertas = alertas
        },
    },

    getters: {
        perfilComunidade: state => state.perfilComunidade,
        chatComunidade: state => state.chatComunidade,
        alertas: state => state.alertas,
    },
    

    actions: {
    },
    modules: {
    }
})
