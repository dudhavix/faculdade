<template>
    <div id="app" class="">
        <MenuSuperior v-if="$route.name != 'login'"/>
        <router-view />
    </div>
</template>

<script>
import MenuSuperior from "./components/menu-superior.vue";
export default {
    components: {
MenuSuperior,
    }
}
</script>
<style>
.mb-6 {
    margin-bottom: 4rem !important;
}
</style>
