<template>
    <div class="">

        <div class="d-grid" data-bs-toggle="modal" data-bs-target="#modal-criar-comunidade">
            <button class="btn btn-primary rounded-pill m-0" type="button">Criar comunidade</button>
        </div>

        <div class="modal fade" id="modal-criar-comunidade" tabindex="-1" aria-labelledby="modal-criar-comunidade"
            aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header d-flex justify-content-start">
                        <span data-bs-dismiss="modal">
                            <i class="bi bi-arrow-left"></i>
                        </span>
                    </div>
                    <div class="modal-body">

                        <h5 class="text-center">Crie sua comunidade</h5>
                        <p class="text-center lh-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                            earum nam ducimus doloremque ipsa animi!</p>

                        <div class="card p-3">
                            <div class="row">
                                <div class="mb-3">
                                    <label for="">Nome</label>
                                    <input v-model="novaComunidade.nome" type="text" class="form-control rounded-pill" id=""
                                        placeholder="Nome da comunidade">
                                </div>

                                <div class="mb-3">
                                    <label for="Descrição">Descrição</label>
                                    <textarea v-model="novaComunidade.descricao" class="form-control" placeholder="Descrição da comunidade" cols="30"
                                        rows="4" style="border-radius: 1.375rem;"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="card mt-4 p-3">
                            <div class="row">
                                <div class="">
                                    <label for="">Comunidade</label>
                                    <br>
                                    <div class="d-flex">
                                        <div class="form-check form-check-inline mb-3">
                                            <input v-model="novaComunidade.aberta" value="true" class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio1">
                                            <label class="form-check-label" for="customRadio1">Aberta</label>
                                        </div>
                                        <div class="form-check">
                                            <input v-model="novaComunidade.aberta" value="false" class="form-check-input" type="radio" name="flexRadioDefault" id="customRadio2">
                                            <label class="form-check-label" for="customRadio2">Fechada</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card mt-4 p-3">
                            <div class="row">
                                <label for="">Selecione uma imagem</label>
                                <br>
                                <div v-for="(foto, index) in imagemComunidade" :key="index" class="col-4 p-2">
                                    <div :class="index == imagemComunidadeSelecionada ? 'border-primary' : ''"
                                        class="border rounded-circle p-3"
                                        @click="selecionarImagem(foto, index)">
                                        <img class="w-100" :src="`${$store.state.hostServidor}/${foto}`" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="carregando" class="d-flex justify-content-between mt-4 pb-4">
                            <div class="d-grid col-12 px-2">
                                <button type="button" class="btn btn-primary mb-0 rounded-pill"><span class="spinner-border text-light"></span></button>
                            </div>
                        </div>

                        <div v-else class="d-flex justify-content-between mt-4 pb-4">
                            <div class="d-grid col-6 px-2">
                                <button type="button" class="btn btn-outline-secondary mb-0 rounded-pill"
                                    data-bs-dismiss="modal" aria-label="Close">cancelar</button>
                            </div>

                            <div class="d-grid col-6 px-2">
                                <button @click="criarComunidade" type="button" class="btn btn-primary mb-0 rounded-pill">Criar</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import requestService from "../../services/requests";

export default {
    name: "CriarComunidade",
    data() {
        return {
            carregando: false,
            novaComunidade: {
                nome: "",
                descricao: "",
                aberta: true,
                foto: "",
            },
            imagemComunidade: [],
            imagemComunidadeSelecionada: null,
        }
    },

    methods: {
        ...mapMutations(["addAlerta"]),

        carregarImagemComunidades() {
            requestService.carregarImagemComunidades().then(resposta => {
                this.imagemComunidade = resposta.data;
            })
        },

        selecionarImagem(imagem, index) {
            this.imagemComunidadeSelecionada = index;
            this.novaComunidade.foto = imagem;
        },

        criarComunidade(){
            this.carregando = true;
            requestService.createComunidade(this.novaComunidade).then(resposta => {
                window.location.reload();
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
        this.carregarImagemComunidades();
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