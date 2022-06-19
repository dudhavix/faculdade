import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from "jwt-decode";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hostServidor: "http://localhost:5000",
        
        token: null,
        usuario: null,
        access_token: null,

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
        setInformacaoUsuario(state, payload){
            state.usuario = payload.usuario;
            state.access_token = payload.access_token;
            state.token = payload.token;
        },

        logoutUsuario(state,){
            state.usuario = null;
            state.access_token = null;
            state.token = null;
        },

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
        getUsuario: state => state.usuario,
        getToken: state => state.token,
    },
    

    actions: {
        setToken({commit}, payload){
            const token = payload || localStorage.getItem("token");
            if(token){
                try {
                    const informacao_usuario = jwtDecode(token);
                    localStorage.setItem("token", token);
                    commit("setInformacaoUsuario", {usuario: informacao_usuario.usuario, access_token: informacao_usuario.access_token, token: token});
                } catch (error) {
                    
                }
            }
        },

        logoutUsuario({commit}){
            localStorage.removeItem("token");
            commit("logoutUsuario");
        },
    },
    modules: {
    }
})
