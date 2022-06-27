<template>
    <div class="">

        <div class="modal fade" id="modal-criar-desafio" tabindex="-1" aria-labelledby="modal-criar-desafio"
            aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-start">
                        <span data-bs-target="#modal-perfil-comunidade" data-bs-toggle="modal" data-bs-dismiss="modal">
                            <i class="bi bi-arrow-left"></i>
                        </span>
                    </div>
                    <div class="modal-body">

                        <h5 class="text-center">Crie o desafio para sua comunidade</h5>
                        <p class="text-center lh-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                            earum nam ducimus doloremque ipsa animi!</p>

                        <div class="card p-3">
                            <div class="row">
                                <div class="mb-3">
                                    <label for="">Titulo</label>
                                    <input v-model="novoDesafio.titulo" type="text" class="form-control rounded-pill"
                                        id="" placeholder="Titulo do desafio">
                                </div>
                            </div>
                        </div>

                        <div class="card mt-4 p-3">
                            <div class="row">
                                <div class="mb-3">
                                    <label for="">Estilo</label>
                                    <br>
                                    <div class="d-flex">
                                        <div class="text-center p-0 px-2 form-check">
                                            <input v-model="novoDesafio.tipo" value='1' class="form-check-input"
                                                type="radio" name="flexRadioDefault" id="customRadio1">
                                            <label class="m-0 form-check-label" for="customRadio1">Primeiro a chegar</label>
                                        </div>
                                        <div class="text-center p-0 px-2 form-check">
                                            <input v-model="novoDesafio.tipo" value='2'
                                                class="m-0 form-check-input" type="radio" name="flexRadioDefault"
                                                id="customRadio2">
                                            <label class="form-check-label" for="customRadio2">Quem vai mais longe</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card mt-4 p-3">
                            <div class="row">
                                <div class="mb-3">
                                    <label for="">Inicio</label>
                                    <input v-model="novoDesafio.inicio" type="date" class="form-control rounded-pill">
                                </div>

                                <div v-if="novoDesafio.tipo == '2'" class="mb-3">
                                    <label for="">Fim</label>
                                    <input v-model="novoDesafio.fim" type="date" class="form-control rounded-pill">
                                </div>

                                <div v-if="novoDesafio.tipo == '1'" class="mb-3">
                                    <label for="">Fim</label>
                                    <input v-model="novoDesafio.meta" type="numer" class="form-control rounded-pill" placeholder="Ex.: 5000">
                                </div>
                            </div>
                        </div>

                        
                        <div v-if="carregando" class="d-flex justify-content-between mt-4 pb-4">
                            <div class="d-grid col-12 px-2">
                                <button type="button" class="btn btn-primary mb-0 rounded-pill"><span
                                        class="spinner-border text-light"></span></button>
                            </div>
                        </div>

                        <div v-else class="d-flex justify-content-between mt-4 pb-4">
                            <div class="d-grid col-6 px-2">
                                <button id="fecharModalCriarDesafio" type="button" class="btn btn-outline-secondary mb-0 rounded-pill"
                                    data-bs-target="#modal-perfil-comunidade" data-bs-toggle="modal" data-bs-dismiss="modal" aria-label="Close">cancelar</button>
                            </div>

                            <div class="d-grid col-6 px-2">
                                <button @click="criarDesafio" type="button"
                                    class="btn btn-primary mb-0 rounded-pill">Criar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import requestService from "../../services/requests";

export default {
    name: "CriarDesafio",

    computed: {
        ...mapGetters(["perfilComunidade"]),
    },

    data() {
        return {
            carregando: false,
            novoDesafio: {
                titulo: "",
                tipo: '1',
                inicio: "",
                fim: "",
                meta: "",
            },
        }
    },

    methods: {
        ...mapMutations(["addAlerta"]),
        
        criarDesafio() {
            this.carregando = true;
            console.log(this.perfilComunidade.comunidade._id);
            requestService.createDesafio({
                ...this.novoDesafio,
                comunidade: this.perfilComunidade.comunidade._id
            }).then(resposta => {
                document.getElementById("fecharModalCriarDesafio").click();
                this.carregando = false;
            }).catch(erro => {
                this.addAlerta({
                    msg: erro.response,
                    status: "alert-error"
                })
            })
        }
    },

    mounted() {
    }
}
</script>

<style>
.modal-header {
    border-bottom: none;
}

.modal-footer {
    border-top: none;
}

.btn-close {
    color: #29292c;
}

.btn-icon {
    font-size: 1.25rem;
}

#botao-adicionar-comunidade {
    position: fixed;
    top: 82vh;
    left: 85vw;
    width: 40px;
    height: 40px;
}
</style>