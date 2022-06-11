<template>
    <div class="">

        <div class="col-12 my-4 px-4">
            <div class="card">
                <div class="card-body p-3">
                    <small class="fw-bold">Meta de atividades</small>
                    <div class="row mt-4">
                        <div class="col-6 mb-3">
                            <label for="">Passos</label>
                            <input disabled v-model="usuario.passos" type="text" class="form-control rounded-pill" id="" placeholder="Nome da comunidade">
                        </div>

                        <div class="col-6 mb-3">
                            <label>Pontos cardio</label>
                            <input disabled v-model="usuario.pontosCardio" type="text" class="form-control rounded-pill" id="" placeholder="Nome da comunidade">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-12 px-4">
            <div class="card">
                <div class="card-body p-3">
                    <small class="fw-bold">Sobre você</small>
                    <div class="row mt-4">
                        <div class="col-6 mb-3">
                            <label>Gênero</label>
                            <input disabled v-model="usuario.genero" type="text" class="form-control rounded-pill" id="" placeholder="Nome da comunidade">
                        </div>

                        <div class="col-6 mb-3">
                            <label>Nascimento</label>
                            <input disabled v-model="usuario.dataNascimento" type="text" class="form-control rounded-pill" id="" placeholder="Nome da comunidade">
                        </div>
                        <div class="col-6 mb-3">
                            <label>Peso</label>
                            <input disabled v-model="usuario.peso" type="number" class="form-control rounded-pill" id="" placeholder="Nome da comunidade">
                        </div>
                        <div class="col-6 mb-3">
                            <label>Altura (cm)</label>
                            <input disabled v-model="usuario.altura" type="number" class="form-control rounded-pill" id="" placeholder="Nome da comunidade">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Menu />
    </div>
    <!-- {{$store.state.user.usuario.name}} -->
</template>

<script>

import Menu from "../components/menu.vue";

export default {
    name: 'Home',
    components: {
        Menu
    },

    data() {
        return {
            usuario: {
                passos: 7500,
                pontosCardio: 30,
                genero: "Feminino",
                peso: 77.1,
                dataNascimento: "10 de out. de 1999",
                altura: 150
            }
        }
    },
}
</script>
