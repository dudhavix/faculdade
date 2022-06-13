<template>
    <div class="mt-4">

        <div class="col-12 px-4 mb-3">
            <ModalCriarComunidade />
        </div>
        <div class="col-12 px-4 mb-7">
            <div class="row">
                <div v-if="comunidades.length == 0" class="text-muted text-center">
                    Você ainda não participa de nenhuma comunidade
                </div>
                <div v-else>
                    <ListaComunidade  :listaComunidades="comunidades" :entrarComunidade="false"/>
                </div>
            </div>
        </div>

        <Menu/>
        <ModalPesquisarComunidade />
        <ModalPerfilComunidade/>
        <ModalChatComunidade/>
        <ModalEditarComunidade/>
    </div>
</template>

<script>
import Menu from "../components/menu.vue";
import ListaComunidade from "../components/comunidade/lista-comunidade.vue";
import ModalCriarComunidade from "../components/comunidade/criar-comunidade.vue";
import ModalEditarComunidade from "../components/comunidade/editar-comunidade.vue";
import ModalPesquisarComunidade from "../components/comunidade/pesquisar-comunidade.vue";
import ModalPerfilComunidade from "../components/comunidade/perfil-comunidade.vue";
import ModalChatComunidade from "../components/comunidade/chat-comunidade.vue";

import requestService from "../services/requests";
import {mapMutations} from "vuex";

export default {
    name: "Comunidades",

    data() {
        return {
            comunidades: [],
        }
    },

    methods: {
        ...mapMutations(["addAlerta"]),
    },

    created(){
        requestService.findByAllUsuario().then(resposta => {
            this.comunidades = resposta.data;
        }).catch(erro => {
            this.addAlerta({
                msg: erro.response,
                status: "alert-error"
            })
            console.log(erro.response);
        });
    },

    components: {
        Menu,
        ListaComunidade,
        ModalCriarComunidade,
        ModalPesquisarComunidade,
        ModalPerfilComunidade,
        ModalChatComunidade,
        ModalEditarComunidade
    },
}
</script>


<style scoped>
.border-blue {
    border-color: #6bb3f1 !important;
    height: 70px;
    width: 70px;
}

.form-control {
    display: block;
    width: 100%;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem;
    color: #495057;
    background-color: white;
    background-clip: padding-box;
    border: 1px solid #d2d6da;
    appearance: none;
    border-radius: 1.375rem;
    transition: 0.2s ease;
    padding: 0.5rem 0.75rem;
}

.input-group>.form-control:focus,
.input-group>.form-select:focus {
    z-index: 0;
}

.input-group {
    border-radius: 1.375rem;
}

.input-group .input-group-text {
    right: 1rem;
}

.input-group .input-group-text i {
    color: #d2d6da;
}

small,
.small {
    font-size: 0.85rem;
}

.mtSmall {
    font-size: 0.6rem;
}
</style>
