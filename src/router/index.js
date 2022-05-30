import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: function () {
            return import('../views/Login.vue')
        }
    },
    {
        path: '/comunidades',
        name: 'comunidades',
        component: function () {
            return import('../views/Comunidades.vue')
        }
    },
    {
        path: '/configuracoes',
        name: 'configuracoes',
        component: function () {
            return import('../views/Configuracoes.vue')
        }
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: function () {
            return import('../views/Perfil.vue')
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
