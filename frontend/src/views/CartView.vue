<!-- frontend/src/views/CartView.vue -->
<script setup>
import { computed } from 'vue';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();

const items = computed(() => cartStore.items);
const totalItems = computed(() => cartStore.totalItems);
const totalAmount = computed(() => cartStore.totalAmount.toFixed(2));

const hasItems = computed(() => items.value.length > 0);

const handleIncrease = (id) => {
  cartStore.increase(id);
};

const handleDecrease = (id) => {
  cartStore.decrease(id);
};

const handleRemove = (id) => {
  cartStore.removeItem(id);
};

const handleClear = () => {
  if (!hasItems.value) return;
  if (confirm('¿Deseas vaciar el carrito?')) {
    cartStore.clearCart();
  }
};
</script>

<template>
  <section class="page">
    <header class="header">
      <h1>Carrito de compras</h1>
      <p class="subtitle">
        Revisa los productos añadidos antes de confirmar tu compra.
      </p>
    </header>

    <div v-if="!hasItems" class="empty">
      <p class="empty-title">Tu carrito está vacío.</p>
      <p class="empty-text">
        Añade productos desde el catálogo para verlos aquí.
      </p>
    </div>

    <div v-else class="content">
      <table class="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th class="th-center">Precio</th>
            <th class="th-center">Cantidad</th>
            <th class="th-center">Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="product-cell">
              <div class="product-info">
                <div class="thumb" v-if="item.imageUrl">
                  <img :src="item.imageUrl" :alt="item.name" />
                </div>
                <div>
                  <p class="product-name">{{ item.name }}</p>
                  <p class="product-category" v-if="item.categoryName">
                    {{ item.categoryName }}
                  </p>
                </div>
              </div>
            </td>

            <td class="cell-center">
              $ {{ Number(item.price).toFixed(2) }}
            </td>

            <td class="cell-center">
              <div class="qty">
                <button
                  type="button"
                  class="qty-btn"
                  @click="handleDecrease(item.id)"
                >
                  -
                </button>
                <span class="qty-value">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="qty-btn"
                  @click="handleIncrease(item.id)"
                >
                  +
                </button>
              </div>
            </td>

            <td class="cell-center">
              $ {{ (item.quantity * Number(item.price)).toFixed(2) }}
            </td>

            <td class="cell-center">
              <button
                type="button"
                class="btn-remove"
                @click="handleRemove(item.id)"
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-info">
          <p>Items: <strong>{{ totalItems }}</strong></p>
          <p>
            Total:
            <strong>$ {{ totalAmount }}</strong>
          </p>
        </div>

        <div class="summary-actions">
          <button
            type="button"
            class="btn-secondary"
            @click="handleClear"
            :disabled="!hasItems"
          >
            Vaciar carrito
          </button>
          <button type="button" class="btn-primary" disabled>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header h1 {
  margin: 0;
  font-size: 1.6rem;
  color: #111827;
}

.subtitle {
  margin-top: 0.25rem;
  color: #4b5563;
  font-size: 0.9rem;
}

/* Estado vacío */
.empty {
  margin-top: 1.5rem;
  padding: 2rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px dashed #d1d5db;
  text-align: center;
  background-color: #f9fafb;
}

.empty-title {
  margin: 0 0 0.25rem;
  font-weight: 600;
  color: #111827;
}

.empty-text {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

/* Tabla */
.content {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.05);
}

th,
td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9rem;
}

th {
  background-color: #f9fafb;
  text-align: left;
  font-weight: 600;
  color: #4b5563;
}

.th-center,
.cell-center {
  text-align: center;
}

.product-cell {
  width: 40%;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.thumb {
  width: 42px;
  height: 42px;
  border-radius: 0.5rem;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumb img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-name {
  margin: 0;
  font-weight: 500;
  color: #111827;
}

.product-category {
  margin: 0;
  font-size: 0.8rem;
  color: #6b7280;
}

/* Cantidad */
.qty {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.qty-btn {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  cursor: pointer;
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-weight: 500;
}

/* Botones */
.btn-remove {
  border: none;
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 999px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
}

.btn-remove:hover {
  background: #fecaca;
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

.summary-info p {
  margin: 0.15rem 0;
  color: #111827;
}

.summary-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn-primary:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: default;
}

@media (max-width: 900px) {
  .table {
    font-size: 0.85rem;
  }

  .product-cell {
    width: 50%;
  }

  .summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .summary-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
