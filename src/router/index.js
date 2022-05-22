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
        name: 'Login',
        component: function () {
            return import('../views/Login.vue')
        }
    },
    {
        path: '/premios',
        name: 'premios',
        component: function () {
            return import('../views/Premios.vue')
        }
    },
    {
        path: '/configuracoes',
        name: 'configuracoes',
        component: function () {
            return import('../views/Configuracoes.vue')
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
