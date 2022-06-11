<template>
    <div class="modal fade" id="modal-chat-comunidade" tabindex="-1" aria-labelledby="modal-chat-comunidadeLabel"
        aria-hidden="true">
        <div v-if="chatComunidade.carregando" class="modal-dialog modal-dialog-centered d-flex justify-content-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else class="modal-dialog modal-fullscreen">
            <div class="modal-content">

                <div class="modal-header d-flex justify-content-between">
                    <span @click="fecharChatComunidade" data-bs-target="#modal-perfil-comunidade" data-bs-toggle="modal"
                        data-bs-dismiss="modal">
                        <i class="bi bi-arrow-left"></i>
                    </span>
                    <h6 class="m-0">{{chatComunidade.nome}}</h6>
                </div>

                <div class="modal-body">
                    <div class="row" id="scrollRow">
                        <div class="col-12 mb-3 d-flex" v-for="(message, index) in chatComunidade.conversa" :key="index">
                            
                            <img :src="message.picture" alt="" class="avatar avatar-sm">
                            <div class="card shadow-md ms-2 p-3">
                                <small class="text-muted text-start">{{message.nome}}</small>
                                <span class="my-2 lh-sm">{{message.message}}</span>
                                <small class="text-muted text-end">{{new Date(message.dataHora).toLocaleString()}}</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer d-flex">
                    <div class="input-group mb-3">
                        <textarea v-model="mensagemEscrita" class="form-control me-2" id="" placeholder="Escreva sua mensagem" rows="2"></textarea>
                        <button @click="enviar" class="btn btn-primary rounded-circle m-0 px-3 py-2" type="button" id="button-addon2" style="max-height: 44px;max-width: 44px;"><i class="bi bi-send-fill"></i></button>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapMutations, mapGetters } from "vuex";

export default {
    name: "ModalChatComunidade",

    props: {
    },

    computed: {
        ...mapGetters(["chatComunidade"])
    },

    data() {
        return {
            mensagemEscrita: ""
        }
    },

    methods: {
        ...mapMutations(["fecharChatComunidade", "addConversaChatComunidade"]),

        enviar(){
            this.addConversaChatComunidade({
                picture: "https://i.pinimg.com/736x/41/10/f0/4110f0f0ed7b6cdc91f367f186e82a0c.jpg",
                nome: "Duda",
                message: this.mensagemEscrita,
                dataHora: moment()
            })
            this.mensagemEscrita = "" 
        }
    }
}
</script>

<style scoped>
#scrollRow{
    scroll-snap-align: end;
}
.modal-body{
    scroll-snap-type: y mandatory;
}
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