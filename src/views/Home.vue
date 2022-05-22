<template>
    <div class="">

        <div class="my-4 col-12 d-flex justify-content-center">
            <div class="border border-5 border-aqua rounded-circle d-flex justify-content-center align-items-center">
                <div
                    class="border border-5 border-blue rounded-circle d-flex justify-content-center align-items-center">
                    <div class="text-center">
                        <small class="m-0">{{ usuario.metaPessoal.toLocaleString("pt-br") }}</small>
                        <h1 class="m-0">{{ usuario.totalPassos.toLocaleString("pt-br") }}</h1>
                        <small class="m-0">passos</small>
                    </div>
                </div>
            </div>
        </div>

        <div class="p-4 col-12 bg-light">
            <div class="d-flex justify-content-between">
                <p class="fw-bold">Comunidades</p>
                <router-link to=""><small class="text-info">detalhes</small></router-link>
            </div>

            <!-- Comunidades -->
            <div class="row d-flex justify-content-around">
                <div class="card-group d-flex" id="list-comunidade">
                    <div v-for="(comunidade, index) in comunidades" :key="index" class="card col-5 p-0 mx-1">
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

            <!-- Atividades -->
            <div class="row d-flex justify-content-center">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <p class="fw-bold">Atividades</p>
                        </div>
                        <div class="card-body pt-0">
                            <div class="chart">
                                <canvas id="atividades" class="chart-canvas" :height="configGraficos.height"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Menu/>
    </div>
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
            }],

            configGraficos: {
                steps: 2500,
                height: "150px"
            }
        }
    },

    methods: {
        montarGrafico() {
            var ctx = document.getElementById("atividades").getContext("2d");

            const metaPessoal = [];
            for (let index = 0; index < 6; index++) {
                metaPessoal.push(this.usuario.metaPessoal)
            }

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
                    datasets: [{
                        label: "Passos",
                        data: this.usuario.historicoAtividades,
                        borderWidth: 0,
                        pointRadius: 0,
                        backgroundColor: "#6bb3f1",
                        maxBarThickness: 10,
                        order: 2,
                    }, {
                        type: 'line',
                        label: 'Meta pessoal',
                        data: metaPessoal,
                        fill: false,
                        pointRadius: 0,
                        borderDash: [5],
                        borderColor: "#6bb3f1",
                        order: 1,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    tooltips: {
                        enabled: true,
                        mode: "index",
                        intersect: false,
                    },

                    scales: {
                        yAxes: [{
                            gridLines: {
                                borderDash: [2],
                                color: '#dee2e6',
                                zeroLineColor: '#dee2e6',
                                zeroLineWidth: 2,
                                zeroLineBorderDash: [2],
                                drawBorder: false,
                                circular: true
                            },
                            ticks: {
                                beginAtZero: true,
                                stepSize: this.configGraficos.steps,
                                fontColor: "#adb5bd",
                                fontStyle: 'normal',
                                fontFamily: "Roboto",
                            },
                        }],

                        xAxes: [{
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                display: true,
                                fontColor: "#adb5bd",
                                fontStyle: 'normal',
                                fontFamily: "Roboto",
                            },

                        }],
                    },
                },
            });
        }
    },


    mounted() {
        this.montarGrafico();
    }
}

</script>

<style scoped>
.border-blue {
    border-color: #6bb3f1 !important;
    height: 150px;
    width: 150px;
}

.border-aqua {
    border-color: #6bf1cf !important;
    height: 165px;
    width: 165px;
}

.p-4-5 {
    padding: 2rem !important;
}

.text-premio {
    color: #fdd201;
}

#list-comunidade {
    overflow-x: scroll;
}

h6 {
    margin: 0;
}

#list-comunidade::-webkit-scrollbar {
    width: 12px;
}

#list-comunidade::-webkit-scrollbar-track {
    background: rgba(255, 166, 0, 0);
}

#list-comunidade::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 255, 0);
    border: none;
}

small,
.small {
    font-size: 0.75em;
    font-weight: 400;
}
</style>