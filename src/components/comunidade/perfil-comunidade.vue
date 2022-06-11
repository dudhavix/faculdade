<template>
    <div class="modal fade" id="modal-perfil-comunidade" tabindex="-1" aria-labelledby="modal-perfil-comunidadeLabel"
        aria-hidden="true">
        <div v-if="perfilComunidade.carregando" class="modal-dialog modal-dialog-centered d-flex justify-content-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                
                <div class="modal-header d-flex justify-content-start">
                    <span v-if="perfilComunidade.entrar" @click="fecharPerfilComunidade" data-bs-target="#pesquisarComunidade" data-bs-toggle="modal" data-bs-dismiss="modal">
                        <i class="bi bi-arrow-left"></i>
                    </span>
                    <span v-else @click="fecharPerfilComunidade" data-bs-dismiss="modal">
                        <i class="bi bi-arrow-left"></i>
                    </span>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="d-flex justify-content-center">
                            <img class="" :src="perfilComunidade.comunidadeSelecionada.foto" alt="" style="max-width: 120px;max-height: 120px;">
                        </div>
                        <div class="col-12 text-center">
                            <h2 class="">{{ perfilComunidade.comunidadeSelecionada.nome }}</h2>
                        </div>
                        <div class="col-12 text-center mt-4">
                            <h6 class="fw-normal">{{ perfilComunidade.comunidadeSelecionada.descricao }}</h6>
                        </div>
                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Nº participantes</small>
                            <h4>{{ perfilComunidade.comunidadeSelecionada.participantes.toLocaleString("pt-br") }}</h4>
                        </div>
                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Admin</small><br>
                            <img class="avatar rounded-circle" :src="perfilComunidade.comunidadeSelecionada.admin.picture">
                            <br>
                            <small class="text-muted">{{perfilComunidade.comunidadeSelecionada.admin.name}}</small><br>
                        </div>
                        <div class="mt-4 col-12 text-center">
                            <small class="text-muted">Alguns participantes</small>
                            <div class="avatar-group ">
                                <a v-for="(usuario, index) in perfilComunidade.comunidadeSelecionada.participantesArray" :key="index"
                                    href="javascript:;" class="avatar rounded-circle">
                                    <img  :src="usuario.picture">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="perfilComunidade.entrar" class="d-flex justify-content-between mt-4 pb-4">
                    <div class="d-grid col-6 px-2">
                        <button type="button" class="btn btn-outline-secondary mb-0 rounded-pill"
                            data-bs-target="#pesquisarComunidade" data-bs-toggle="modal" data-bs-dismiss="modal" aria-label="Close">cancelar</button>
                    </div>
                    <div class="d-grid col-6 px-2">
                        <button type="button" class="btn btn-primary mb-0 rounded-pill">Entrar</button>
                    </div>
                </div>

                <div v-else class="d-flex justify-content-between mt-4 pb-4">
                    <div class="d-grid col-12 px-2">
                        <button @click="abrirChat"  data-bs-toggle="modal" data-bs-target="#modal-chat-comunidade" type="button" class="btn btn-primary mb-0 rounded-pill">Abrir chat</button>
                    </div>
                </div>

            </div>
        </div> 
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
    name: "ModalPerfilComunidade",

    props: {
    },

    computed: {
        ...mapGetters(["perfilComunidade"]),
    },

    methods: {
        ...mapMutations(["fecharPerfilComunidade", "abrirChatComunidade"]),

        abrirChat(){
            this.abrirChatComunidade({
                idChat: this.perfilComunidade.comunidadeSelecionada._id,
                nome: "Deserunt",
                carregando: false,
                conversa: [{
                picture: "https://i.pinimg.com/736x/41/10/f0/4110f0f0ed7b6cdc91f367f186e82a0c.jpg",
                nome: "Teste 1",
                message: "Deserunt consequuntur et distinctio vitae provident",
                dataHora: "06-10-2022 21:45:45"
            },{
                picture: "https://i.pinimg.com/736x/41/10/f0/4110f0f0ed7b6cdc91f367f186e82a0c.jpg",
                nome: "Teste 2",
                message: "Deserunt consequuntur et distinctio vitae providentDeserunt consequuntur et distinctio vitae providentDeserunt consequuntur et distinctio vitae provident",
                dataHora: "06-11-2022 14:45:45"
            },{
                picture: "https://i.pinimg.com/736x/41/10/f0/4110f0f0ed7b6cdc91f367f186e82a0c.jpg",
                nome: "Teste 3",
                message: "Deserunt",
                dataHora: "06-11-2022 10:45:45"
            },{
                picture: "https://i.pinimg.com/736x/41/10/f0/4110f0f0ed7b6cdc91f367f186e82a0c.jpg",
                nome: "Teste 4",
                message: "Deserunt consequuntur ",
                dataHora: "06-11-2022 22:45:45"
            },{
                picture: "https://i.pinimg.com/736x/41/10/f0/4110f0f0ed7b6cdc91f367f186e82a0c.jpg",
                nome: "Teste 5",
                message: "Deserunt consequuntur et distinctio vitae providentDeserunt consequuntur et distinctio vitae provident",
                dataHora: "06-11-2022 23:45:45"
            }]
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