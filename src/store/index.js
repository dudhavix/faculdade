import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
        user: {
            usuario: {
                _id: "628daaae9bd0b369008968d9",
                sub: "109648348890999991353",
                name: "Duda Santos",
                picture: "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c",
                email: "dudu.amelhor@gmail.com",
                locale: "pt-BR",
                __v: 0
            },
            accessToken: "ya29.a0ARrdaM960W2nH9f7hBMgK6HghC-fvOLYwE3xbJlkDi0FDOgdSBxMuKrbTC_cIKkQQLn372Fr6HSKk2JNQhuim2r6PY5KHD4novEGr5ZUYFolOGgyZgGdFqtfnQOYr8WHPvoufCoyLk7dbEOUltXYeVvHXkFD"
        },
        comunidades: [{
            _id: "628daaae9bd0b369008968d9",
            nome: "Unisales TI",
            descricao: "Deserunt consequuntur et distinctio vitae provident enim accusantium ab dolor fugiat dolore ipsum fugit aliquam ipsam numquam omnis minus non, iste expedita",
            meta: 45000,
            privacidade: "PUBLICO",
            status: "ATIVO",
            created: "",
            initiated: "30/05/2022 00:00:00",
            finished: "31/05/2022 23:59:59",
            participantes: 15
        }, {
            _id: "628daaae9bd0b369008968d9",
            nome: "Unisales Grifos",
            descricao: "Deserunt consequuntur et distinctio vitae provident enim accusantium ab dolor fugiat dolore ipsum fugit aliquam ipsam numquam omnis minus non, iste expedita",
            meta: 50000,
            privacidade: "PUBLICO",
            status: "ATIVO",
            created: "",
            initiated: "01/06/2022 08:00:00",
            finished: "30/06/2022 23:59:59",
            participantes: 85
        }, {
            _id: "628daaae9bd0b369008968d9",
            nome: "Unisales Professores",
            descricao: "Deserunt consequuntur et distinctio vitae provident enim accusantium ab dolor fugiat dolore ipsum fugit aliquam ipsam numquam omnis minus non, iste expedita",
            meta: 52500,
            privacidade: "PUBLICO",
            status: "ATIVO",
            created: "",
            initiated: "05/06/2022 05:00:00",
            finished: "31/07/2022 23:59:59",
            participantes: 150000
        }],
        enum: {
            PUBLICO: "público",
            PRIVADO: "privado"
        }
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload;
        },

        setUser(state, payload){
            state.user = {
                usuario: {
                    _id: "628daaae9bd0b369008968d9",
                    sub: "109648348890999991353",
                    name: "Duda Santos",
                    picture: "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c",
                    email: "dudu.amelhor@gmail.com",
                    locale: "pt-BR",
                    __v: 0
                },
                accessToken: "ya29.a0ARrdaM960W2nH9f7hBMgK6HghC-fvOLYwE3xbJlkDi0FDOgdSBxMuKrbTC_cIKkQQLn372Fr6HSKk2JNQhuim2r6PY5KHD4novEGr5ZUYFolOGgyZgGdFqtfnQOYr8WHPvoufCoyLk7dbEOUltXYeVvHXkFD"
            }
        }
    },
    actions: {
    },
    modules: {
    }
})
