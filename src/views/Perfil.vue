<template>
    <div class="">
        <div class="mt-3 px-4 col-12">
            <h2 class="display-3">Perfil</h2>
        </div>

        <div class="col-12 my-4 px-4">
            <div class="card">
                <div class="card-body p-3">
                    <small class="fw-bold">Meta de atividades</small>
                    <div class="row mt-4">
                        <div class="col-6 form-floating">
                            <input disabled v-model="usuario.passos" type="number" class="form-control">
                            <label>Passos</label>
                        </div>

                        <div class="col-6 form-floating">
                            <input disabled v-model="usuario.pontosCardio" type="number" class="form-control">
                            <label>Pontos cardio</label>
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
                        <div class="col-6 form-floating mb-4">
                            <input readonly v-model="usuario.genero" type="text" class="form-control">
                            <label>Gênero</label>
                        </div>
                        <div class="col-6 form-floating mb-4">
                            <input disabled v-model="usuario.dataNascimento" type="text" class="form-control">
                            <label>Data de nascimento</label>
                        </div>
                        <div class="col-6 form-floating">
                            <input disabled v-model="usuario.peso" type="number" class="form-control">
                            <label>Peso</label>
                        </div>
                        <div class="col-6 form-floating">
                            <input disabled v-model="usuario.altura" type="number" class="form-control">
                            <label>Altura (cm)</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Menu/>
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
