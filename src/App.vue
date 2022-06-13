<template>
    <div id="app" class="">
        <MenuSuperior v-if="$route.name != 'login'" :usuario="$store.state.usuario"/>
        <router-view />
        <Alertas/>
    </div>
</template>


<script>

import MenuSuperior from "./components/menu-superior.vue";
import Alertas from "./components/alertas.vue";
export default {
    components: {
        MenuSuperior,
        Alertas
    },
}
</script>
<style>
.mb-6 {
    margin-bottom: 4rem !important;
}
</style>
