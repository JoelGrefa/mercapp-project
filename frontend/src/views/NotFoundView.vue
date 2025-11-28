<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="page">
    <h1>404</h1>
    <p>Página no encontrada.</p>
    <RouterLink to="/">Volver al inicio</RouterLink>
  </section>
</template>

<style scoped>
.page {
  padding: 2rem;
}
</style>
