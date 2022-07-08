<template>
    <nav v-if="usuario" class="d-flex justify-content-between navbar p-3 top-0 z-index-3 w-100 rounded-bottom navbar-light ">
        <h4 class="m-0 text-capitalize">{{ $route.name }}</h4>
        <div class="d-flex justify-content-end align-items-center">
            <a href="javascript:;" class="mx-4">
                <i class="bi bi-info-circle"></i>
            </a>
            <div class="dropdown">
                <a class="avatar avatar-sm rounded-circle" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img referrerpolicy="no-referrer" class="rounded-circle" alt="Image placeholder" :src="usuario.picture">
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li class="text-end" @click="logout"><a class="dropdown-item">Sair</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import requestService from "../services/requests";
import { mapActions } from "vuex";
export default {
    props: {
        usuario: {
            type: Object,
        },
    },

    methods: {
        ...mapActions(["logoutUsuario"]),

        logout() {
            this.logoutUsuario();
            window.location.reload();
        }
    }
}
</script>
