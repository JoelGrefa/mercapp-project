<script setup>
import { computed } from 'vue';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();

const items = computed(() => cartStore.items);
const totalItems = computed(() => cartStore.totalItems);
const totalPrice = computed(() => cartStore.totalPrice);

// 🔹 Resolver URL de la imagen igual que en ProductCard/Detalle
const getImageSrc = (url) => {
  if (!url) {
    return 'https://via.placeholder.com/60x60?text=MercApp';
  }
  if (url.startsWith('/uploads')) {
    return `http://localhost:4000${url}`;
  }
  return url;
};

const increment = (item) => {
  cartStore.updateQuantity(item.id, item.quantity + 1);
};

const decrement = (item) => {
  cartStore.updateQuantity(item.id, item.quantity - 1);
};

const removeItem = (item) => {
  cartStore.removeItem(item.id);
};

const clearCart = () => {
  if (confirm('¿Vaciar el carrito?')) {
    cartStore.clearCart();
  }
};
</script>

<template>
  <section class="page">
    <h1>Carrito de compras</h1>

    <div v-if="items.length === 0" class="state">
      Tu carrito está vacío.
    </div>

    <div v-else class="cart">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="product">
              <div class="thumb">
                <img
                  :src="getImageSrc(item.imageUrl)"
                  :alt="item.name"
                />
              </div>
              <span>{{ item.name }}</span>
            </td>
            <td>$ {{ Number(item.price).toFixed(2) }}</td>
            <td>
              <button @click="decrement(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increment(item)">+</button>
            </td>
            <td>
              $ {{ (item.quantity * Number(item.price)).toFixed(2) }}
            </td>
            <td>
              <button class="remove" @click="removeItem(item)">X</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <p>Items: {{ totalItems }}</p>
        <p>Total: $ {{ totalPrice.toFixed(2) }}</p>
        <button class="clear" @click="clearCart">Vaciar carrito</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  padding: 2rem 0;
}

h1 {
  margin-bottom: 1.5rem;
}

.state {
  margin-top: 1rem;
}

.cart table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  padding: 0.75rem;
  border-bottom: 1px solid #374151;
  text-align: left;
}

.product {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* mini marco blanco para miniaturas */
.thumb {
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.thumb img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

td button {
  padding: 0.25rem 0.5rem;
  margin: 0 0.25rem;
  border-radius: 0.375rem;
  border: none;
  background-color: #4b5563;
  color: white;
  cursor: pointer;
}

td button:hover {
  background-color: #6b7280;
}

.remove {
  background-color: #b91c1c;
}

.remove:hover {
  background-color: #dc2626;
}

.summary {
  margin-top: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: flex-end;
}

.clear {
  background-color: #ef4444;
}

.clear:hover {
  background-color: #dc2626;
}
</style>
