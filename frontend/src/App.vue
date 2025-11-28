<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app">
    <header class="navbar">
      <div class="container nav">
        <RouterLink to="/" class="logo">MercApp</RouterLink>

        <nav class="nav-links">
          <RouterLink to="/">Catálogo</RouterLink>
          <RouterLink to="/cart">Carrito</RouterLink>
          <RouterLink to="/about">Acerca de</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <RouterView />
      </div>
    </main>

    <footer class="footer">
      <div class="container footer-content">
        <span>MercApp · Aplicaciones Web</span>
        <span>Desarrollado por Joel Grefa</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* contenedor principal */
.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* navbar clara con sombra ligera */
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
}

.logo {
  font-weight: 800;
  font-size: 1.2rem;
  color: #2563eb; /* azul marca */
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #4b5563;
  font-size: 0.95rem;
}

.nav-links a.router-link-active {
  font-weight: 600;
  color: #111827;
  border-bottom: 2px solid #f59e0b;
}

.main {
  flex: 1;
  padding: 2rem 0 3rem;
}

.footer {
  border-top: 1px solid #e5e7eb;
  padding: 0.75rem 0;
  background-color: #ffffff;
  font-size: 0.85rem;
  color: #6b7280;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
