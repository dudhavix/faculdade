<template>
    <div class="modal fade" id="modal-perfil-comunidade" tabindex="-1" aria-labelledby="modal-perfil-comunidadeLabel"
        aria-hidden="true">
        <div v-if="perfilComunidade.carregando"
            class="modal-dialog modal-dialog-centered d-flex justify-content-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-between">
                    <span v-if="perfilComunidade.entrar" @click="fecharPerfilComunidade"
                        data-bs-target="#pesquisarComunidade" data-bs-toggle="modal" data-bs-dismiss="modal">
                        <i class="bi bi-arrow-left"></i>
                    </span>

                    <span v-else @click="fecharPerfilComunidade" data-bs-dismiss="modal">
                        <i class="bi bi-arrow-left"></i>
                    </span>

                    <span>
                        <div class="dropdown">
                            <a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-three-dots-vertical"></i>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li class="text-end"><a class="dropdown-item" href="#">Compartilhar</a></li>
                                <li data-bs-toggle="modal" data-bs-target="#modal-editar-comunidade" v-if="perfilComunidade.comunidade.admin._id == $store.state.usuario._id" class="text-end"><a class="dropdown-item" href="#">Editar</a></li>
                                <li @click="sair" v-if="(perfilComunidade.comunidade.admin._id != $store.state.usuario._id) && !perfilComunidade.entrar" class="text-end"><a class="dropdown-item" >Sair da comunidade</a></li>
                                <li @click="fechar" v-if="perfilComunidade.comunidade.admin._id == $store.state.usuario._id" class="text-end"><a class="dropdown-item" >Fechar a comunidade</a></li>
                            </ul>
                        </div>
                    </span>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="d-flex justify-content-center">
                            <img class="" :src="$store.state.hostServidor + '/' + perfilComunidade.comunidade.foto" alt=""
                                style="max-width: 120px;max-height: 120px;">
                        </div>
                        <div class="col-12 text-center">
                            <h2 class="">{{ perfilComunidade.comunidade.nome }}</h2>
                        </div>
                        <div class="col-12 text-center mt-4">
                            <h6 class="fw-normal">{{ perfilComunidade.comunidade.descricao }}</h6>
                        </div>
                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Nº participantes</small>
                            <h4>{{ perfilComunidade.comunidade.totalParticipantes.toLocaleString("pt-br") }}</h4>
                        </div>
                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Admin</small><br>
                            <img class="avatar rounded-circle" :src="perfilComunidade.comunidade.admin.picture">
                            <br>
                            <small class="text-muted">{{ perfilComunidade.comunidade.admin.name }}</small><br>
                        </div>
                        <div class="mt-4 col-12 text-center">
                            <small class="text-muted">Alguns participantes</small>
                            <div class="avatar-group ">
                                <a v-for="(participante, index) in perfilComunidade.participantes" :key="index"
                                    href="javascript:;" class="avatar rounded-circle">
                                    <img :src="participante.usuario.picture">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="perfilComunidade.entrar" class="d-flex justify-content-between mt-4 pb-4">
                    <div class="d-grid col-6 px-2">
                        <button type="button" class="btn btn-outline-secondary mb-0 rounded-pill"
                            data-bs-target="#pesquisarComunidade" data-bs-toggle="modal" data-bs-dismiss="modal"
                            aria-label="Close">cancelar</button>
                    </div>
                    <div class="d-grid col-6 px-2">
                        <button @click="entrarComunidade" type="button"
                            class="btn btn-primary mb-0 rounded-pill">Entrar</button>
                    </div>
                </div>

                <div v-else class="d-flex justify-content-between mt-4 pb-4">
                    <div class="d-grid col-12 px-2">
                        <button @click="abrirChat" data-bs-toggle="modal" data-bs-target="#modal-chat-comunidade"
                            type="button" class="btn btn-primary mb-0 rounded-pill">Abrir chat</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import io from "socket.io-client";
import requestService from "../../services/requests";
import { mapMutations, mapGetters } from "vuex";
import store from '../../store';

const socket = io(store.state.hostServidor);

export default {
    name: "ModalPerfilComunidade",

    props: {
    },

    data() {
        return {
            conversas: null
        }
    },

    computed: {
        ...mapGetters(["perfilComunidade"]),
    },

    methods: {
        ...mapMutations(["fecharPerfilComunidade", "abrirChatComunidade", "addConversaChatComunidade"]),

        sair(){
            requestService.sairComunidade(this.perfilComunidade.comunidade._id).then(resposta => {
                window.location.reload()
            }).catch(erro => {
                console.log(erro.response);
            });
        },
        fechar(){
            requestService.deleteComunidade(this.perfilComunidade.comunidade._id).then(resposta => {
                window.location.reload()
            }).catch(erro => {
                console.log(erro.response);
            });
        },
        
        entrarComunidade() {
            requestService.entrarComunidade(this.perfilComunidade.comunidade._id).then(resposta => {
                window.location.reload();
            }).catch(erro => {
                console.log(erro.response);
            });
        },

        abrirChat() {
            requestService.findByChatComunidade(this.perfilComunidade.comunidade._id).then(resposta => {
                this.conversas = resposta.data
                socket.emit("abrirChatComunidade", this.perfilComunidade.comunidade._id);
            
                this.abrirChatComunidade({
                    idChat: this.perfilComunidade.comunidade._id,
                    nome: this.perfilComunidade.comunidade.nome,
                    carregando: false,
                    conversa: this.conversas
                });
            })
            
            socket.on("message:received", (data) => {
                this.addConversaChatComunidade(data)
            })
            
        }
    }
}
</script>

<style scoped>
.modal-header {
    border-bottom: none;
}

.modal-footer {
    border-top: none;
}

.btn-close {
    color: #29292c;
}
</style>