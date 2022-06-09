<template>
    <div class="modal fade" id="modal-perfil-comunidade" tabindex="-1" aria-labelledby="modal-perfil-comunidadeLabel"
        aria-hidden="true">

        <div v-if="carregando" class="modal-dialog modal-dialog-centered d-flex justify-content-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-else class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header d-flex align-items-center">
                    <h6 class="modal-title" id="exampleModalLabel">Desafio {{ enumeration[comunidade.privacidade] }}
                    </h6>

                    <button type="button" class="btn-close d-flex align-items-center" data-bs-dismiss="modal"
                        aria-label="Close">
                        <i class="bi bi-x"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h2 class="">{{ comunidade.nome }}</h2>
                        </div>

                        <div class="col-12 text-center mt-4">
                            <h6 class="fw-normal">{{ comunidade.descricao }}</h6>
                        </div>

                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Nº participantes</small>
                            <h4>{{ comunidade.participantes.length.toLocaleString("pt-br") }}</h4>
                        </div>

                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Meta</small>
                            <h4>{{ comunidade.meta.toLocaleString("pt-br") }}</h4>
                        </div>

                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Inicio do desafio</small>
                            <h4 class="mb-0">{{ comunidade.initiated.split(" ")[0] }}</h4>
                            <small>{{ comunidade.initiated.split(" ")[1] }}</small>
                        </div>

                        <div class="mt-4 col-6 text-center">
                            <small class="text-muted">Fim do desafio</small>
                            <h4 class="mb-0">{{ comunidade.finished.split(" ")[0] }}</h4>
                            <small>{{ comunidade.finished.split(" ")[1] }}</small>
                        </div>

                        <div class="mt-4 col-12 text-center">
                            <small class="text-muted">Alguns participantes</small>

                            <div class="avatar-group ">
                                <a v-for="(usuario, index) in comunidade.participantes.usuarios" :key="index"
                                    href="javascript:;" class="avatar rounded-circle"
                                    tabindex="0" data-bs-toggle="tooltip" data-bs-placement="top" :title="usuario.name">
                                    <img alt="Image placeholder" :src="usuario.picture">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer justify-content-center d-grid pb-4">
                    <div class="text-center">
                        <button type="button" class="btn bg-gradient-primary mb-0 rounded-pill">Entrar agora</button>
                    </div>
                    <div class="text-center">
                        <button type="button" class="btn btn-sm mb-0 rounded-pill" data-bs-dismiss="modal" aria-label="Close">Agora não</button>
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