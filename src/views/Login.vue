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

                        <button @click="login" class="btn btn-icon btn-light rounded-pill d-flex justify-content-between align-items-center" type="button">
                            Entre
                            <span class="h4 mb-0 ms-4">
                                <i class="bi bi-arrow-right-short"></i>
                            </span>
                        </button>

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

    methods:{
        ...mapMutations(["setUsuario"]),

        login(){
            // requestsService.login().then(resposta => {
            //     console.log(resposta.data);
            //     this.setUsuario(resposta.data);
            //     this.$router.push({ name: "home"});
            // }).catch(erro => {
            //     console.log(erro);
            // })
        }
    },

    created() { },

    mounted() {
    },

    setup(){
        const vueGoogleOauth2 = inject("VueGoogleOauth2")
    }
};
</script>

<style scoped>
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