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
                
                <div class="modal-header d-flex justify-content-start">
                    <span @click="fecharChatComunidade" data-bs-target="#modal-perfil-comunidade" data-bs-toggle="modal" data-bs-dismiss="modal">
                        <i class="bi bi-arrow-left"></i>
                    </span>
                </div>

                <div class="modal-body">
                    <div class="row">
                        
                    </div>
                </div>

                <div class="d-flex justify-content-between mt-4 pb-4">
                    input de mensagem 
                </div>

                

            </div>
        </div> 
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
    name: "ModalChatComunidade",

    props: {
    },

    computed: {
        ...mapGetters(["chatComunidade"])
    },

    methods: {
        ...mapMutations(["fecharChatComunidade"])
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