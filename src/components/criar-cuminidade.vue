<template>
    <div class="">

        <div class="d-grid" data-bs-toggle="modal" data-bs-target="#modal-criar-comunidade">
            <button class="btn btn-primary rounded-pill m-0" type="button">Criar comunidade</button>
        </div>

        <div class="modal fade" id="modal-criar-comunidade" tabindex="-1" aria-labelledby="modal-criar-comunidade"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="modal-criar-comunidade">Nova comunidade</h6>
                        <button type="button" class="btn-close d-flex align-items-center" data-bs-dismiss="modal"
                            aria-label="Close">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        

                        <div class="row mt-4">

                            <div class="col-12 form-floating mb-4">
                                <input required type="text" v-model="novaComunidade.nome" class="form-control">
                                <label>Nome</label>
                            </div>

                            <div class="col-12 form-floating mb-4">
                                <textarea required v-model="novaComunidade.descricao" class="form-control"></textarea>
                                <label>Descrição</label>
                            </div>

                            <div class="col-6 form-floating mb-4">
                                <input type="tel" v-model="novaComunidade.meta" class="form-control">
                                <label>Meta</label>
                            </div>

                            


                            <div class="col-6 form-floating mb-4">
                                <input type="date" v-model="novaComunidade.inicioDesafio" class="form-control">
                                <label>Inicio do desafio</label>
                            </div>

                            <div class="col-6 form-floating mb-4">
                                <input type="date" v-model="novaComunidade.fimDesafio" class="form-control">
                                <label>Fim do desafio</label>
                            </div>


                            <div class="col-6 form-floating mb-4">
                                <select v-model="novaComunidade.privacidade" class="form-control">
                                    <option :value="$store.state.enum.PUBLICO" class="text-capitalize">{{$store.state.enum.PUBLICO}}</option>
                                    <option :value="$store.state.enum.PRIVADO" class="text-capitalize">{{$store.state.enum.PRIVADO}}</option>
                                </select>
                                
                                <label>Privacidade</label>
                            </div>

                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "CriarComunidade",
    data() {
        return {
            novaComunidade: {
                nome: "",
                descricao: "",
                meta: 5000,
                inicioDesafio: moment().add(1, 'day').format("YYYY-MM-DD"),
                fimDesafio: moment().add(7, 'day').format("YYYY-MM-DD"),
                privacidade: this.$store.state.enum.PRIVADO,
            }
        }
    },
}
</script>

<style>
.modal-header {
    border-bottom: none;
}

.modal-footer {
    border-top: none;
}

.btn-close {
    color: #29292c;
}

.btn-icon {
    font-size: 1.25rem;
}

#botao-adicionar-comunidade {
    position: fixed;
    top: 82vh;
    left: 85vw;
    width: 40px;
    height: 40px;
}
</style>