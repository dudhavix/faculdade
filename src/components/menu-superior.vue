<template>
    <nav class="d-flex justify-content-end navbar p-3 top-0 z-index-3 w-100 rounded-bottom navbar-light ">
        <a href="javascript:;" class="mx-4">
            <i class="bi bi-info-circle"></i>
        </a>

        <a href="javascript:;" class="avatar avatar-sm rounded-circle">
            <img alt="Image placeholder" :src="user.usuario.picture">
        </a>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            user: this.$store.state.user
        }
    },
}
</script>
