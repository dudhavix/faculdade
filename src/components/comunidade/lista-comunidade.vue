<template>
    <div>
        <div v-for="(comunidade, index) in listaComunidades" :key="index" class="col-12 my-2">
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
        selecionarComunidade(comunidadeId) {
            let comunidade
            let desafios

            requestService.findByIdComunidade(comunidadeId).then(resposta => {
                comunidade = resposta.data;

                requestService.findByIdComunidadeDesafio(comunidadeId).then(resposta => {
                    desafios = resposta.data

                    this.abrirPerfilComunidade({
                        ...comunidade,
                        desafios: desafios,
                        carregando: false,
                        entrar: this.entrarComunidade
                    });
                    
                }).catch(erro => {
                    console.log(erro.response);
                })

            }).catch(erro => {
                console.log(erro.response);
            })





        }
    },

    components: {}
}
</script>

<style>
</style>