<template>
    <div class="modal fade" id="modal-perfil-comunidade" tabindex="-1" aria-labelledby="modal-perfil-comunidadeLabel"
        aria-hidden="true">

        <div v-if="carregando" class="modal-dialog modal-dialog-centered d-flex justify-content-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else class="modal-dialog modal-fullscreen">
            <div class="modal-content">

                <div class="modal-header d-flex justify-content-start">
                    <span data-bs-dismiss="modal">
                        <i class="bi bi-arrow-left"></i>
                    </span>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="d-flex justify-content-center">
                            <img class="" :src="comunidade.foto" alt="" style="max-width: 120px;max-height: 120px;">
                            
                        </div>

                        <div class="col-12 text-center">
                            <h2 class="">{{ comunidade.nome }}</h2>
                        </div>

                        <div class="col-12 text-center mt-4">
                            <h6 class="fw-normal">{{ comunidade.descricao }}</h6>
                        </div>

                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Nº participantes</small>
                            <h4>{{ comunidade.participantes.toLocaleString("pt-br") }}</h4>
                        </div>

                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Admin</small><br>
                            <img class="avatar rounded-circle" :src="comunidade.admin.picture">
                            <br>
                            <small class="text-muted">{{comunidade.admin.name}}</small><br>

                        </div>

                        <div class="mt-4 col-12 text-center">
                            <small class="text-muted">Alguns participantes</small>

                            <div class="avatar-group ">
                                <a v-for="(usuario, index) in comunidade.participantesArray" :key="index"
                                    href="javascript:;" class="avatar rounded-circle">
                                    <img  :src="usuario.picture">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="entrar" class="d-flex justify-content-between mt-4 pb-4">
                    <div class="d-grid col-6 px-2">
                        <button type="button" class="btn btn-outline-secondary mb-0 rounded-pill"
                            data-bs-dismiss="modal" aria-label="Close">cancelar</button>
                    </div>
{{entrar}}
                    <div class="d-grid col-6 px-2">
                        <button type="button" class="btn btn-primary mb-0 rounded-pill">Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalPerfilComunidade",

    props: {
        comunidade: {
            type: Object
        },
        carregando: {
            type: Boolean
        },
        entrar: {
            type: String
        }
    },

    data() {
        return {
            enumeration: this.$store.state.enum
        }
    },
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