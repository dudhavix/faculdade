<template>
    <nav class="position-fixed d-flex justify-content-end navbar p-3 top-0 z-index-3 w-100 shadow-none navbar-transparent ">
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
