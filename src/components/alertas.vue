<template>
    <div>
        <div v-if="alertas.lenght > 0" id="caixaDeAlerta">
            <div v-for="(alerta, index) in alertas" :key="index">
                <div :class="alerta.status"  class="alert alert-dismissible fade show" role="alert">
                    {{alerta.msg}}
                    <button @click="removerAlerta(alerta.id)" type="button" class="btn-close text-white" data-bs-dismiss="alert" aria-label="Close">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    name: "alertas",
    computed: {
        ...mapGetters(["alertas"])
    },
    methods: {
        ...mapMutations(["removerAlerta"])
    }
}
</script>

<style>
#caixaDeAlerta {
    position: fixed;
    top: 5vh;
    z-index: 9999;
    width: 100vw;
    /* height: 95vh; */
    padding: 2rem;
    overflow: scroll;
}

.alert{
    /* z-index: 999999999; */
    color: white;
}
</style>