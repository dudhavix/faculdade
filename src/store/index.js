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
