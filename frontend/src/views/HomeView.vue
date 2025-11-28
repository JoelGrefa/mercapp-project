<script setup>
import { useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useCartStore } from '../store/cart';
import ProductCard from '../components/ProductCard.vue';

const router = useRouter();
const cartStore = useCartStore();

const {
  categories,
  loading,
  error,
  searchQuery,
  selectedCategory,
  visibleProducts,
} = useProducts();

const goToDetail = (id) => {
  router.push({ name: 'product-detail', params: { id } });
};

const handleAddToCart = (product) => {
  cartStore.addItem(product);
  alert(`"${product.name}" se agregó al carrito`);
};
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Catálogo de productos</p>
        <h1>MercApp</h1>
        <p class="subtitle">
          Explora, filtra y añade productos a tu carrito en tiempo real.
        </p>
      </div>
    </header>

    <div class="filters">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por nombre o descripción..."
      />

      <select v-model="selectedCategory">
        <option value="all">Todas las categorías</option>
        <option
          v-for="cat in categories"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="state">Cargando productos...</div>
    <div v-else-if="error" class="state error">
      Ocurrió un error al cargar los productos.
    </div>
    <div v-else-if="visibleProducts.length === 0" class="state">
      No hay productos que coincidan con la búsqueda.
    </div>

    <div class="grid" v-else>
      <ProductCard
        v-for="product in visibleProducts"
        :key="product.id"
        :product="product"
        @open-detail="goToDetail"
        @added-to-cart="handleAddToCart"
      />
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

/* Títulos con texto oscuro */
.eyebrow {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

h1 {
  font-size: 2.2rem;
  margin: 0;
  color: #111827;
}

.subtitle {
  margin-top: 0.4rem;
  color: #4b5563;
  font-size: 0.95rem;
}

/* Inputs claros sobre fondo claro */
.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filters input,
.filters select {
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #111827;
  font-size: 0.9rem;
  min-width: 220px;
}

.filters input::placeholder {
  color: #6b7280;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.state {
  margin-top: 1rem;
}

.state.error {
  color: #f87171;
}
</style>
