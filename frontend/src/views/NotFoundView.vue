<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="page">
    <div class="content">
      <p class="code">404</p>
      <h1>Página no encontrada</h1>
      <p class="text">
        La ruta que intentas acceder no existe o ya no se encuentra disponible.
        Verifica la dirección o vuelve al catálogo de productos.
      </p>

      <div class="actions">
        <RouterLink to="/" class="btn-primary">
          Volver al catálogo
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  max-width: 480px;
}

.code {
  margin: 0;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #e5e7eb;
}

h1 {
  margin: 0.2rem 0 0.4rem;
  font-size: 1.7rem;
  color: #111827;
}

.text {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
}

.btn-primary:hover {
  background: #1d4ed8;
}
</style>
