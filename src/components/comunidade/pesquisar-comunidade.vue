<template>
    <div>
        <button @click="carregarPesquisa" id="lupaComunidade" type="button" class="btn btn-primary rounded-circle" data-bs-toggle="modal"
            data-bs-target="#pesquisarComunidade">
            <i class="bi bi-search"></i>
        </button>

        <div class="modal fade" id="pesquisarComunidade" tabindex="-1" aria-labelledby="pesquisarComunidadeLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-header d-flex justify-content-start">
                            <span data-bs-dismiss="modal">
                                <i class="bi bi-arrow-left"></i>
                            </span>
                        </div>
                    </div>
                    <div class="modal-body">
                        <h5 class="text-center">Encontre</h5>
                        <p class="text-center lh-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Informe o ID da comunidade"
                                aria-label="Informe o ID da comunidade" aria-describedby="basic-addon2">
                            <span class="input-group-text" id="basic-addon2"><i class="bi bi-search"></i></span>
                        </div>

                        <h6 class="text-center mt-5">Talvez você se interesse</h6>
                        
                        <div v-if="comunidades.length > 0">
                            <ListaComunidade  :comunidades="comunidades" :entrarComunidade="true"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import requestService from "../../services/requests";

import ListaComunidade from "./lista-comunidade.vue";

export default {
    name: "PesquisarComunidade",

    data() {
        return {
            comunidades: [],
        }
    },

    methods: {
        carregarPesquisa(){
            requestService.findByRandom().then(resposta => {
                this.comunidades = resposta.data;
            }).catch(erro => {
                console.log(erro);
            })
        }
    },

    components: {
        ListaComunidade
    }
}
</script>

<style>
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

#lupaComunidade {
    position: fixed;
    top: 85vh;
    left: 85vw;
    padding: 0;
    margin: 0;
    width: 40px;
    height: 40px;
}
</style>