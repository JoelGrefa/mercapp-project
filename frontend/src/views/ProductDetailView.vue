<script setup>
import { useRoute, useRouter, RouterLink } from 'vue-router';   // 👈 ACTUALIZADO
import { ref, onMounted, computed } from 'vue';
import { useApi } from '../composables/useApi';
import { useCartStore } from '../store/cart';
import { useToast } from '../composables/useToast';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const { showToast } = useToast();

const product = ref(null);
const loading = ref(false);
const error = ref(null);

const { request } = useApi('http://localhost:4000');

// Resuelve la URL de la imagen
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
  // 🔹 Usamos toast en vez de alert
  showToast(`"${product.value.name}" se agregó al carrito`);
};

const goToEdit = () => {
  if (!product.value) return;
  router.push(`/product/${route.params.id}/edit`);
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
      <p>Producto no encontrado.</p>
      <RouterLink to="/" class="back-btn">Volver al catálogo</RouterLink>
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

        <div class="actions">
          <button class="btn" type="button" @click="addToCart">
            Añadir al carrito
          </button>

          <button class="btn-secondary" type="button" @click="goToEdit">
            Editar producto
          </button>
        </div>
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

/* Imagen */
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

/* Texto */
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
  color: #ea580c;
}

.description {
  margin-bottom: 1.5rem;
  color: #374151;
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

/* Acciones */
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* Botón secundario */
.btn-secondary {
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* 👇 NUEVO: botón "Volver al catálogo" cuando no hay producto */
.back-btn {
  display: inline-block;
  margin-top: 0.75rem;
  padding: 0.5rem 1.2rem;
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
