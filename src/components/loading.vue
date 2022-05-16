<template>
    <div id="tela-loading" class="d-flex justify-content-center align-items-center">
        <div id="spinner" class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "loading"
}
</script>

<style scoped>
#tela-loading{
    position: fixed;
    z-index: 9;
    height: 100vh;
    width: 100vw;
    background-color: #7b809a;
}
</style>