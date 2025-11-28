<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useApi } from '../composables/useApi';
import { useCartStore } from '../store/cart';

const route = useRoute();
const cartStore = useCartStore();

const product = ref(null);
const loading = ref(false);
const error = ref(null);

const { request } = useApi('http://localhost:4000');

// Resolver URL de la imagen igual que en las cards
const imageSrc = computed(() => {
  if (!product.value?.imageUrl) {
    return 'https://via.placeholder.com/800x500?text=MercApp';
  }
  if (product.value.imageUrl.startsWith('/uploads')) {
    return `http://localhost:4000${product.value.imageUrl}`;
  }
  return product.value.imageUrl;
});

const fetchProduct = async () => {
  loading.value = true;
  error.value = null;
  try {
    const data = await request({
      url: `/api/products/${route.params.id}`,
      method: 'GET',
    });
    product.value = data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  if (!product.value) return;
  cartStore.addItem(product.value);
  alert(`"${product.value.name}" se agregó al carrito`);
};

onMounted(fetchProduct);
</script>

<template>
  <section class="page">
    <div v-if="loading" class="state">Cargando producto...</div>

    <div v-else-if="error" class="state error">
      Error al cargar el producto.
    </div>

    <div v-else-if="!product" class="state">
      Producto no encontrado.
    </div>

    <div v-else class="detail">
      <div class="image-wrapper">
        <div class="image-frame">
          <img :src="imageSrc" :alt="product.name" />
        </div>
      </div>

      <div class="info">
        <h1>{{ product.name }}</h1>
        <p class="category">
          {{ product.category?.name || 'Sin categoría' }}
        </p>

        <p class="price">
          $ {{ Number(product.price).toFixed(2) }}
        </p>

        <p class="description">
          {{ product.description }}
        </p>

        <button class="btn" type="button" @click="addToCart">
          Añadir al carrito
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  padding: 2rem 0;
}

.detail {
  display: grid;
  gap: 2rem;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  align-items: center;
}

/* Marco para la imagen */
.image-wrapper {
  display: flex;
  justify-content: center;
}

.image-frame {
  width: 100%;
  max-width: 480px;
  height: 320px;
  background-color: #ffffff;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.16);
}

.image-frame img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* TEXTO: todo en oscuro para buena lectura */
.info h1 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  color: #111827;
}

.category {
  color: #6b7280;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.price {
  margin: 0 0 1rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: #ea580c; /* naranja tipo oferta */
}

/* 🔹 Descripción ahora sí bien visible */
.description {
  margin-bottom: 1.5rem;
  color: #374151;   /* gris oscuro */
  font-size: 0.95rem;
  line-height: 1.5;
}

.btn {
  padding: 0.75rem 1.8rem;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn:hover {
  background-color: #1d4ed8;
}

.state {
  margin-top: 1rem;
}

.state.error {
  color: #dc2626;
}

@media (max-width: 900px) {
  .detail {
    grid-template-columns: 1fr;
  }

  .image-frame {
    max-width: 100%;
  }
}
</style>
