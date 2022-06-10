<template>
    <div class="mt-4">

        <div class="col-12 px-4 mb-3">
            <ModalCriarComunidade />
        </div>

        <div class="col-12 px-4 mb-7">
            <div class="row">
                <ItemComunidade :comunidades="comunidades" :statusComunidade="false"/>
            </div>
        </div>

        <Menu />
        <ModalPesquisarComunidade />
    </div>
</template>

<script>
import Menu from "../components/menu.vue";
import ModalPerfilComunidade from "../components/modal-perfil-comunidade.vue";
import ModalCriarComunidade from "../components/criar-cuminidade.vue";
import ModalPesquisarComunidade from "../components/pesquisar-comunidade.vue";
import ItemComunidade from "../components/item-comunidade.vue";

export default {
    name: "Comunidades",

    data() {
        return {
            pesquisa: "",
            usuario: {
                metaPessoal: 7500,
                totalPassos: 3743,
                historicoAtividades: [1230, 7229, 6448, 8369, 6442, 3720, 2760]
            },

            comunidades: this.$store.state.comunidades,
        }
    },

    components: {
        Menu,
        ModalPerfilComunidade,
        ModalCriarComunidade,
        ModalPesquisarComunidade,
        ItemComunidade
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
