<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="page">
    <div class="card">
      <h1>404 - Página no encontrada</h1>
      <p>La ruta que intentas acceder no existe.</p>

      <!-- 🔹 Botón Volver al catálogo -->
      <RouterLink to="/" class="back-btn">
        Volver al catálogo
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.page {
  min-height: calc(100vh - 7rem); /* aprox. restando header y footer */
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background-color: #ffffff;
  padding: 1.8rem 2.2rem;
  border-radius: 0.9rem;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  text-align: center;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
  color: #111827;
}

p {
  margin: 0 0 1.25rem;
  color: #4b5563;
}

/* 🔹 Estilo del botón */
.back-btn {
  display: inline-block;
  padding: 0.55rem 1.3rem;
  border-radius: 999px;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}

.back-btn:hover {
  background-color: #1d4ed8;
}
</style>
