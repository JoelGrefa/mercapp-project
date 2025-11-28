<script setup>
import { computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['added-to-cart', 'open-detail']);

const imageSrc = computed(() => {
  if (!props.product.imageUrl) {
    return 'https://via.placeholder.com/400x260?text=MercApp';
  }
  if (props.product.imageUrl.startsWith('/uploads')) {
    return `http://localhost:4000${props.product.imageUrl}`;
  }
  return props.product.imageUrl;
});

const onAddToCart = () => {
  emit('added-to-cart', props.product);
};

const onOpenDetail = () => {
  emit('open-detail', props.product.id);
};
</script>

<template>
  <article class="card">
    <div class="card-image" @click="onOpenDetail">
      <img :src="imageSrc" :alt="product.name" />
    </div>

    <div class="card-body">
      <div class="card-header" @click="onOpenDetail">
        <h2>{{ product.name }}</h2>
        <span class="chip">
          {{ product.category?.name || 'Sin categoría' }}
        </span>
      </div>

      <p class="description">
        {{ product.description }}
      </p>

      <div class="card-footer">
        <span class="price">
          $ {{ Number(product.price).toFixed(2) }}
        </span>
        <button class="btn" type="button" @click.stop="onAddToCart">
          Añadir al carrito
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* CARD TOTALMENTE BLANCA */
.card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
  transition: transform 0.16s ease, box-shadow 0.16s ease,
    border-color 0.16s ease;
}

.card:hover {
  transform: translateY(-3px);
  border-color: #c7d2fe;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
}

/* MARCO DE LA IMAGEN */
.card-image {
  width: 100%;
  height: 200px;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid #e5e7eb;
}

.card-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

/* TEXTO OSCURO PARA BUENA LECTURA */
.card-body {
  padding: 0.9rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #111827;
}

.card-header {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
  cursor: pointer;
}

.card-header h2 {
  font-size: 0.95rem;
  margin: 0;
  color: #111827;
}

.chip {
  font-size: 0.72rem;
  padding: 0.18rem 0.5rem;
  border-radius: 999px;
  background-color: #e0f2fe;
  border: 1px solid #bae6fd;
  color: #0369a1;
  white-space: nowrap;
}

.description {
  font-size: 0.82rem;
  color: #4b5563;
  min-height: 2.2em;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  gap: 0.75rem;
}

/* PRECIO LLAMATIVO PERO LEGIBLE */
.price {
  font-weight: 700;
  color: #ea580c; /* naranja tipo oferta */
  font-size: 0.98rem;
}

/* BOTÓN AZUL COMO TIENDA */
.btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  text-align: center;
}

.btn:hover {
  background-color: #1d4ed8;
}
</style>
