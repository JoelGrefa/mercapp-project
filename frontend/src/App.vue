<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Toast from './components/Toast.vue';
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

    <!-- 🔹 Notificación global, visible en todas las páginas -->
    <Toast />
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

/* HEADER OSCURO */
.navbar {
  background: linear-gradient(to right, #020617, #111827);
  border-bottom: 1px solid #020617;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.5);
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
  color: #38bdf8;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #e5e7eb;
  font-size: 0.95rem;
}

.nav-links a.router-link-active {
  font-weight: 600;
  color: #ffffff;
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
