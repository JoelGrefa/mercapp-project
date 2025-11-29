<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';              // 👈 NUEVO
import ProductCard from '../components/ProductCard.vue';
import { useApi } from '../composables/useApi';
import { useCartStore } from '../store/cart';
import { useToast } from '../composables/useToast';

const router = useRouter();                          // 👈 NUEVO

const cartStore = useCartStore();
const { showToast } = useToast();

const { request } = useApi('http://localhost:4000');

const products = ref([]);
const categories = ref([]);
const search = ref('');
const selectedCategory = ref('all');
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const [productsData, categoriesData] = await Promise.all([
      request({ url: '/api/products', method: 'GET' }),
      request({ url: '/api/categories', method: 'GET' }),
    ]);

    products.value = productsData;
    categories.value = categoriesData;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const filteredProducts = computed(() => {
  let list = products.value;

  if (search.value.trim()) {
    const term = search.value.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term)),
    );
  }

  if (selectedCategory.value !== 'all') {
    list = list.filter(
      (p) => p.categoryId === Number(selectedCategory.value),
    );
  }

  return list;
});

const handleAddToCart = (product) => {
  cartStore.addItem(product);
  showToast(`"${product.name}" se agregó al carrito`);
};

const handleOpenDetail = (id) => {
  window.location.href = `/product/${id}`;
};

// 👇 NUEVO
const goToNewProduct = () => {
  router.push('/product/new');
};
</script>

<template>
  <section class="page">
    <header class="header">
      <div class="header-main">
        <div>
          <p class="eyebrow">Catálogo de productos</p>
          <h1>MercApp</h1>
          <p class="subtitle">
            Explora, filtra y añade productos a tu carrito en tiempo real.
          </p>
        </div>

        <button
          type="button"
          class="btn-new-product"
          @click="goToNewProduct"
        >
          + Nuevo producto
        </button>
      </div>
    </header>

    <section class="filters">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre o descripción"
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
    </section>

    <section v-if="loading" class="state">
      Cargando productos...
    </section>

    <section v-else-if="error" class="state error">
      Error al cargar productos.
    </section>

    <section v-else>
      <p v-if="filteredProducts.length === 0" class="state">
        No se encontraron productos para los filtros aplicados.
      </p>

      <div v-else class="grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @added-to-cart="handleAddToCart"
          @open-detail="handleOpenDetail"
        />
      </div>
    </section>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.eyebrow {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: #9ca3af;
  margin-bottom: 0.25rem;
}

h1 {
  font-size: 2rem;
  margin: 0;
  color: #111827;
}

.subtitle {
  margin-top: 0.4rem;
  color: #4b5563;
  font-size: 0.95rem;
}

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

/* grid de productos */
.grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.state {
  margin-top: 1rem;
  color: #4b5563;
}

.state.error {
  color: #dc2626;
}

/* 👇 NUEVO */
.header-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.btn-new-product {
  align-self: center;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-new-product:hover {
  background: #1d4ed8;
}
</style>
