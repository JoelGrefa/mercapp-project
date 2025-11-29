<script setup>
</script>

<template>
  <section class="page">
    <header class="header">
      <p class="eyebrow">Información del proyecto</p>
      <h1>Acerca de MercApp</h1>
      <p class="subtitle">
        MercApp es una aplicación web de catálogo y carrito de compras desarrollada
        como proyecto académico para la asignatura de Aplicaciones Web.
      </p>
    </header>

    <div class="grid">
      <article class="card">
        <h2>Objetivo de la aplicación</h2>
        <p>
          MercApp permite visualizar un catálogo de productos organizado por
          categorías, consultar el detalle de cada producto y gestionar un
          carrito de compras en tiempo real.
        </p>
        <p>
          La aplicación implementa una arquitectura cliente–servidor, donde el
          frontend está construido con <strong>Vue 3 + Vite</strong> y el backend con
          <strong>Node.js, Express y Sequelize</strong> sobre una base de datos relacional.
        </p>
      </article>

      <article class="card">
        <h2>Características técnicas</h2>
        <ul class="list">
          <li>Single Page Application (SPA) con <strong>vue-router</strong>.</li>
          <li>
            Gestión de estado global del carrito con <strong>Pinia</strong> y
            persistencia en <strong>localStorage</strong>.
          </li>
          <li>
            Consumo de API REST para productos y categorías (listado,
            detalle, creación y edición).
          </li>
          <li>
            Filtros por categoría, búsqueda por nombre o descripción y
            navegación por rutas dinámicas <code>/product/:id</code>.
          </li>
          <li>Diseño responsivo y uso de componentes reutilizables.</li>
        </ul>
      </article>

      <article class="card">
        <h2>Autoría</h2>
        <p>
          Proyecto desarrollado por <strong>Joel Grefa</strong> como parte de la Unidad 3:
          <em>Desarrollo de aplicaciones web SPA con Vue</em>.
        </p>
        <p>
          El propósito principal es demostrar el uso integrado de
          enrutamiento, comunicación con servicios REST, manejo de estado y
          buenas prácticas en la construcción de interfaces web modernas.
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.header {
  max-width: 720px;
}

.eyebrow {
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
}

.header h1 {
  margin: 0.4rem 0;
  font-size: 1.9rem;
  color: #111827;
}

.subtitle {
  margin: 0;
  color: #4b5563;
  font-size: 0.95rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: #ffffff;
  border-radius: 0.9rem;
  padding: 1.35rem 1.4rem;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
  border: 1px solid #e5e7eb;
}

.card h2 {
  margin: 0 0 0.6rem;
  font-size: 1.1rem;
  color: #111827;
}

.card p {
  margin: 0.2rem 0;
  color: #4b5563;
  font-size: 0.9rem;
}

.list {
  margin: 0.4rem 0 0;
  padding-left: 1.1rem;
  color: #4b5563;
  font-size: 0.9rem;
}

.list li + li {
  margin-top: 0.25rem;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
