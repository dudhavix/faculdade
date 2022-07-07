import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';
import requestService from '../services/requests';
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
    },
    {
        path: '*',
        redirect: '/login'
    }
]



const router = new VueRouter({
    mode: 'history',
    base: "/",
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.name == 'home' || to.name == 'comunidades' || to.name == 'perfil') {
        if (!store.state.token) {
            next('/login');
        }
    }
    if (to.name == "login") {
        store.dispatch('setToken', to.query.token);
        if (store.state.token) {
            next('/comunidades');
        }
    }
    next();
});

export default router
