<template>
    <div>
        <div class="page-header align-items-start min-vh-100"
            :style="{ backgroundImage: 'url(' + require('../assets/bg-03.jpg') + ')', backgroundPositionX: '50%' }"
            loading="fast">
            <span class="mask bg-gradient-dark opacity-6"></span>


            <div class="container my-auto">
                <div class="">
                    <div class="card-body  text-white">

                        <div id="iconVida"
                            class="bg-white-transparente d-flex justify-content-center align-items-center">
                            <i class="bi bi-activity h1 m-0 text-white"></i>
                        </div>

                        <div class="my-4">
                            <h1 class="text-white mb-4">Some quick example</h1>

                            <p class="card-text">
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                        </div>
                        <button id="botaoGoogle" class="btn bg-white rounded-pill shadow-none" @click="login">Entre com sua conta</button>
                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>

import { mapMutations } from "vuex";
import requestsService from "../services/requests";

import Footer from "../components/footer.vue"

export default {
    components: {
        Footer,
    },

    data() {
        return {
        }
    },

    methods: {
        ...mapMutations(["setUsuario"]),

        sair() {
            console.log(1);
            google.accounts.id.disableAutoSelect();
        },

        login(){
            requestsService.login().then(resposta => {
                console.log(resposta);
                window.location.href = resposta.data
            })
        }


    },
};
</script>

<style scoped>
#botaoGoogle{
    background-image: url("../assets/google-icon.png");
    background-size: 3rem;
    /* width: 3rem; */
    background-repeat: no-repeat;
    background-position: right;
    padding-right: 3rem;
}

.bg-white-transparente {
    background-color: #ffffff4f !important;
    color: white;

}

#iconVida {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    color: white;
}

.btn-light {
    color: #000;
    background-color: white;
    border-color: white;
}
</style>