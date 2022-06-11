<template>
    <div>
        <div v-for="(comunidade, index) in listaComunidades" :key="index" class="col-12 my-2">
            <div @click="selecionarComunidade(index)" class="card" data-bs-toggle="modal" data-bs-target="#modal-perfil-comunidade">
                <div class="card-body py-3">
                    <div class="row">
                        <div class="col-12 my-3">
                            <h6 class="text-truncate m-0 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top"
                                :title="comunidade.nome">{{ comunidade.nome }}</h6>
                            <p class="small lh-sm m-0">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nesciunt, sequi vero!
                            </p>
                        </div>

                        <div class="col-6 text-center">
                            <small class="text-muted">Participantes</small>
                            <h4>{{ comunidade.participantes.toLocaleString("pt-br") }}</h4>
                        </div>

                        <div class="col-6 text-center">
                            <img class="w-50" :src="comunidade.foto" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    name: "ListaComunidade",
    props: {
        listaComunidades: {
            type: Array
        },
        entrarComunidade: {
            type: Boolean
        }
    },

    data() {
        return {}
    },

    methods: {
        ...mapMutations(["abrirPerfilComunidade"]),
        selecionarComunidade(index){
            this.abrirPerfilComunidade({
                comunidadeSelecionada: this.listaComunidades[index],
                carregando: false,
                entrar: this.entrarComunidade//this.deOnde == "minhasComunidades" ? false : true
            })
        }
    },

    components: { }
}
</script>

<style>
</style>