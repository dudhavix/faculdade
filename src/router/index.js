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
    mode:'history',
    base: "/",
    routes
})

router.beforeEach(async (to, from, next) => {
    const usuarioLogin = await requestService.login();
    store.dispatch('setUsuario', usuarioLogin.data)
    
    if (to.fullPath == '/' || to.fullPath == '/comunidades' || to.fullPath == '/perfil') {
      if (store.state.usuario._id == "") {
        next('/login');
      }
    }
    if (to.fullPath == '/login') {
      if (store.state.usuario._id != "") {
        next('/');
      }
    }
    next();
  });

export default router
