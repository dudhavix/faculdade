<template>
    <div>
        <div v-for="(comunidade, index) in comunidades" :key="index" class="col-12 my-2">

            <div @click="selecionarComunidade(comunidade._id)" class="card" data-bs-toggle="modal"
                data-bs-target="#modal-perfil-comunidade">
                <div class="card-body py-3">
                    <div class="row">
                        <div class="col-12 my-3">
                            <h6 class="text-truncate m-0 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top"
                                :title="comunidade.nome">{{ comunidade.nome }}</h6>
                            <p class="small lh-sm m-0">
                                {{ comunidade.descricao }}
                            </p>
                        </div>

                        <div class="col-6 text-center">
                            <small class="text-muted">Participantes</small>
                            <h4>{{ comunidade.totalParticipantes.toLocaleString("pt-br") }}</h4>
                        </div>

                        <div class="col-6 text-center">
                            <img class="w-50" :src="$store.state.hostServidor + '/' + comunidade.foto" alt="">
                        </div>

                        <div v-if="$store.state.usuario.participantes" class="col-12 mt-3">
                            <ul class="list-group list-group-flush">
                                <li v-for="(participante, index) in $store.state.usuario.participantes" :key="index" class="list-group-item">
                                    
                                    <div class="d-flex justify-content-between">
                                        <small class="text-muted">{{index+1}}º</small>
                                        <small :class="participante.usuario._id == $store.state.usuario._id ? 'fw-bold' : 'text-muted'" class=" text-capitalize text-center">{{participante.usuario.name}}</small>
                                        <small :class="participante.usuario._id == $store.state.usuario._id ? 'fw-bold' : 'text-muted'" class="">{{participante.totalPassos}}</small>
                                        <span v-if="index==0"><i class="bi bi-award-fill text-primary"></i></span>
                                        <span v-else></span>                                        
                                    </div>

                                </li>
                           
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import requestService from "../../services/requests";

import { mapMutations } from "vuex";
export default {
    name: "ListaComunidade",
    props: {
        comunidades: {
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
        selecionarComunidade(idComunidade) {
            requestService.findByIdComunidade(idComunidade).then(resposta => {
                this.abrirPerfilComunidade({
                    comunidade: resposta.data.comunidade,
                    participantes: resposta.data.participantes,
                    desafios: [resposta.data.desafio],
                    carregando: false,
                    entrar: this.entrarComunidade
                });
            })
            
        }
    },

    components: {}
}
</script>

<style>
</style>