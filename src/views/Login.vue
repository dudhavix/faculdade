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
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
}
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "987882199766-gmlinen7da4cjurg54p15pqa5ghbsh5h.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        prompt: "consent",
        scope: "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read",
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        {
            type: "standard",
            shape: "pill",
            theme: "outline",
            text: "Entrar",
            size: "large",
            logo_alignment: "left"
        }  // customization attributes,
    );
    //   google.accounts.id.prompt(); // also display the One Tap dialog
}

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