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
                picture: "https://lh3.googleusercontent.com/-UTu1Vfwvuuw/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuck4g4Olt159nat0eLfdRgZyDrkMQA/s128-c/photo.jpg",
                email: "dudu.amelhor@gmail.com",
                locale: "pt-BR",
                __v: 0
            },
            accessToken: "ya29.a0ARrdaM8l-1fLHL4qOC4uWt7caBitVQBYGVp_xkNUvnJRt5ws_WJVP5LM15LT0AZJFUpxdnFtkCpVMLqEHnlet8-cFyY-TJDcLWhBBwbasgOHUbErelHxmy5BCe1ueJ85UkmzagOYMyRbrMqFOQaGj5sNo-3u"
        },
        comunidades: [{
            _id: "628daaae9bd0b369008968d9",
            nome: "Deserunt",
            descricao: "Deserunt consequuntur et distinctio vitae provident enim accusantium ab dolor fugiat dolore ipsum fugit aliquam ipsam numquam omnis minus non, iste expedita",
            meta: 45000,
            privacidade: "PUBLICO",
            foto: "http://localhost:3030/img-comunidades/1.png",
            status: "ATIVO",
            participantes: 14,
            admin: {
                name: "Gisele Cunha",
                picture: "https://th.bing.com/th/id/OIP.NlMhbM68C0sOc7OzI6H27QHaHa?pid=ImgDet&rs=1"
            },
            participantesArray: [{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            }]
        }, {
            _id: "628daaae9bd0b369008968d9",
            nome: "Deserunt",
            descricao: "Deserunt consequuntur et distinctio vitae provident enim accusantium ab dolor fugiat dolore ipsum fugit aliquam ipsam numquam omnis minus non, iste expedita",
            meta: 50000,
            privacidade: "PUBLICO",
            foto: "http://localhost:3030/img-comunidades/2.png",
            status: "ATIVO",
            participantes: 7,
            admin: {
                name: "Edgar Poll",
                picture: "https://www.reinigung-aktuell.at/wp-content/uploads/hollu_PR_Lehnert_Dominik.jpg"
            },
            participantesArray: [{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            },{
                picture: "https://www.dachs-partner.de/wp-content/uploads/2021/01/Dachs-Partner_112020_Stage_Web.jpg"
            }]
        }],
        enum: {
            PUBLICO: "público",
            PRIVADO: "privado"
        },
        hostServidor: "http://localhost:3030/"
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
