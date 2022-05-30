<template>
    <div>
        <div class="mt-4 px-4 col-12">
            <h6>Comunidades</h6>
        </div>

        <div class="col-12 px-4 mb-6">
            <div class="row">
                <div v-for="(comunidade, index) in comunidades" :key="index" class="col-6 my-2">
                    <div class="card">
                        <div class="card-body py-2">
                            <div class="">
                                <i :class="comunidade.icon"></i>
                            </div>
                            <div class="">
                                <h6 class="text-truncate" data-bs-toggle="tooltip" data-bs-placement="top"
                                    :title="comunidade.nome">{{ comunidade.nome }}</h6>
                            </div>
                            <h6 class="card-text text-muted m-0">
                                <span>{{ comunidade.metaPassos.toLocaleString("pt-br") }}</span><br>
                                <small>{{ comunidade.suaPosicao }}º {{ comunidade.seuNumeroPassos.toLocaleString("pt-br") }}</small>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <Menu />
    </div>
</template>

<script>
import Menu from "../components/menu.vue";

export default {
    name: "Comunidades",

    data() {
        return {
            usuario: {
                metaPessoal: 7500,
                totalPassos: 3743,
                historicoAtividades: [1230, 7229, 6448, 8369, 6442, 3720, 2760]
            },

            comunidades: [{
                nome: "Unisales TI",
                icon: "bi bi-robot",
                metaPassos: 5000,
                suaPosicao: "3",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Grifos",
                icon: "bi bi-globe",
                metaPassos: 15000,
                suaPosicao: "25",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Professores",
                icon: "bi bi-mortarboard-fill",
                metaPassos: 10000,
                suaPosicao: "12",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Professores",
                icon: "bi bi-mortarboard-fill",
                metaPassos: 10000,
                suaPosicao: "12",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Professores",
                icon: "bi bi-mortarboard-fill",
                metaPassos: 10000,
                suaPosicao: "12",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Professores",
                icon: "bi bi-mortarboard-fill",
                metaPassos: 10000,
                suaPosicao: "12",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Professores",
                icon: "bi bi-mortarboard-fill",
                metaPassos: 10000,
                suaPosicao: "12",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Professores",
                icon: "bi bi-mortarboard-fill",
                metaPassos: 10000,
                suaPosicao: "12",
                seuNumeroPassos: 3743
            }, {
                nome: "Unisales Professores",
                icon: "bi bi-mortarboard-fill",
                metaPassos: 10000,
                suaPosicao: "12",
                seuNumeroPassos: 3743
            }],

            configGraficos: {
                steps: 2500,
                height: "150px"
            }
        }
    },

    components: {
        Menu
    }
}
</script>



