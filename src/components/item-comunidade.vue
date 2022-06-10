<template>
    <div>
        <div v-for="(comunidade, index) in comunidades" :key="index" class="col-12 my-2">
            <div class="card" data-bs-toggle="modal" @click="setComunidadeID(index)"
                data-bs-target="#modal-perfil-comunidade">
                <div class="card-body py-3">
                    <div class="row">
                        <div class="col-12 my-3">
                            <h6 class="text-truncate m-0 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top"
                                :title="comunidade.nome">{{ comunidade.nome }}</h6>
                            <p class="small lh-sm m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Nesciunt,
                                sequi vero!</p>
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
        <ModalPerfilComunidade :carregando="carregando" :comunidade="comunidade" :entrar="statusComunidade"/>
    </div>
</template>

<script>
import ModalPerfilComunidade from "./modal-perfil-comunidade.vue";

export default {
    name: "ItemComunidade",
    props: {
        comunidades: {
            type: Array
        },
        statusComunidade: {
            type: Boolean
        }
    },

    data() {
        return {
            carregando: true,
            comunidade: null,
        }
    },

    methods: {
        setComunidadeID(comunidadeID) {
            this.carregando = true;
            this.comunidade = this.comunidades[comunidadeID]
            this.carregando = false;
        },
    },

    components: {
        ModalPerfilComunidade
    }
}
</script>

<style>
</style>