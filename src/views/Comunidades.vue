<template>
    <div class="mt-4">


        <!-- <div class="col-12 px-4 my-3">
            <div class="card"
                :style="{ backgroundImage: 'url(' + require('../assets/bg-03.jpg') + ')', backgroundPositionX: '50%', backgroundPositionY: '50%' }"
                loading="fast">
                <div class="card-body text-white">
                    <h4 class="text-white">Comunidades</h4>
                    <p>Encontre um novo desafio!</p>
                </div>
            </div>
        </div> -->

        <div class="col-12 px-4 mb-3">
            <CriarComunidade/>
        </div>

        <div class="col-12 px-4 mb-6">
            <div class="row">
                <div v-for="(comunidade, index) in comunidades" :key="index" class="col-12 my-2">
                    <div class="card" data-bs-toggle="modal" @click="setComunidadeID(comunidade._id)" data-bs-target="#modal-perfil-comunidade">
                        <div class="card-body py-3">
                            <div class="row">
                                <div class="col-12 my-3">
                                    <h6 class="text-truncate m-0 lh-sm" data-bs-toggle="tooltip" data-bs-placement="top" :title="comunidade.nome">{{ comunidade.nome }}</h6>
                                    <p class="small lh-sm m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, sequi vero!</p>
                                </div>

                                <div class="col-6 text-center">
                                    <small class="text-muted">Participantes</small>
                                    <h4>{{comunidade.participantes.toLocaleString("pt-br")}}</h4>
                                </div>

                                <div class="col-6 text-center">
                                    <img class="w-50" :src="comunidade.foto" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Menu/>
        <ModalPerfilComunidade :comunidade="modal.comunidade" :carregando="modal.carregando"/>
        
    </div>
</template>

<script>
import Menu from "../components/menu.vue";
import ModalPerfilComunidade from "../components/modal-perfil-comunidade.vue";
import CriarComunidade from "../components/criar-cuminidade.vue";

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

            modal: {
                comunidade: null,
                carregando: true,
            }
        }
    },

    components: {
        Menu,
        ModalPerfilComunidade,
        CriarComunidade
    },

    methods: {
        setComunidadeID(comunidadeID) {
            this.modal.carregando = true;
            this.modal.comunidade = {
                _id: "628daaae9bd0b369008968d9",
                nome: "Unisales TI",
                descricao: "Deserunt consequuntur et distinctio vitae provident enim accusantium ab dolor fugiat dolore ipsum fugit aliquam ipsam numquam omnis minus non, iste expedita",
                meta: 45000,
                privacidade: "PUBLICO",
                status: "ATIVO",
                created: "",
                initiated: "30/05/2022 00:00:00",
                finished: "31/05/2022 23:59:59",
                participantes: {
                    length: 14585,
                    usuarios: [{
                        name: "Duda1 Santos",
                        picture: "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c",
                    },{
                        name: "Duda2 Santos",
                        picture: "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c",
                    },{
                        name: "Duda3 Santos",
                        picture: "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c",
                    },{
                        name: "Duda4 Santos",
                        picture: "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c",
                    },{
                        name: "Duda5 Santos",
                        picture: "https://lh3.googleusercontent.com/a-/AOh14GiWHV6kWvjd_TqZpA6z4SnV2U4pDwgUxsXP8HWH=s96-c",
                    },]
                }
            };
            this.modal.carregando = false;
        },
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
