<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid d-flex justify-content-around">

            <router-link :to="{ name: 'home' }">
                <h4 v-if="menuAtivo.home" class="active">
                    <i class="bi bi-house-door-fill"></i>
                </h4>
                <h4 v-else class="text-color-cinza">
                    <i class="bi bi-house-door"></i>
                </h4>
            </router-link>

            <router-link :to="{ name: 'premios' }">
                <h4 v-if="menuAtivo.premios" class="active">
                    <i class="bi bi-award-fill"></i>
                </h4>
                <h4 v-else class="text-color-cinza">
                    <i class="bi bi-award"></i>
                </h4>
            </router-link>

            <router-link :to="{ name: 'configuracoes' }">
                <h4 v-if="menuAtivo.configuracoes" class="active">
                    <i class="bi bi-gear-fill"></i>
                </h4>
                <h4 v-else class="text-color-cinza">
                    <i class="bi bi-gear"></i>
                </h4>
            </router-link>

        </div>
    </nav>
</template>

<script>
export default {
    name: "Menu",

    data() {
        return {
            menuAtivo: {
                home: false,
                premios: false,
                configuracoes: false
            }
        }
    },

    methods: {
        carregarMenu(){
            switch (this.$route.name) {
                case "premios":
                    this.menuAtivo.home = false;
                    this.menuAtivo.premios = true;
                    this.menuAtivo.notificacao = false;
                    this.menuAtivo.configuracoes = false;
                    break;
                
                case "configuracoes":
                    this.menuAtivo.home = false;
                    this.menuAtivo.premios = false;
                    this.menuAtivo.notificacao = false;
                    this.menuAtivo.configuracoes = true;
                    break;
            
                default:
                    this.menuAtivo.home = true;
                    this.menuAtivo.premios = false;
                    this.menuAtivo.notificacao = false;
                    this.menuAtivo.configuracoes = false;
                    break;
            }
            return ;
        }
    },

    mounted() {
        this.carregarMenu()
    }
}
</script>

<style scoped>
nav {
    position: fixed;
    bottom: 0;
}

.navbar {
    box-shadow: none;
    width: 100vw;
}

.text-color-cinza {
    color: #c8ccd1;
}

.active {
    color: #6bb3f1;
}
</style>