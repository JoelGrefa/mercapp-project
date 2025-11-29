import { defineStore } from 'pinia';

const STORAGE_KEY = 'mercapp_cart_v1';
const API_BASE_URL = 'http://localhost:4000';   // 👈 NUEVO

// 👇 NUEVA función auxiliar
function normalizeImageUrl(url) {
  if (!url) return '';

  // Si ya viene con http / https, la dejamos igual
  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  // Si viene como /uploads/xxx.jpg o similar, la pegamos al backend
  return `${API_BASE_URL}${url}`;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalAmount: (state) =>
      state.items.reduce(
        (sum, item) => sum + item.quantity * Number(item.price || 0),
        0
      ),
  },

  actions: {
    initFromStorage() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            this.items = parsed;
          }
        }
      } catch (err) {
        console.error('Error cargando carrito desde localStorage', err);
      }
    },

    saveToStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (err) {
        console.error('Error guardando carrito en localStorage', err);
      }
    },

    addItem(product) {
      if (!product || !product.id) return;

      const existing = this.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        // 👇 aquí usamos normalizeImageUrl y además intentamos
        // varias propiedades por si el backend usa otro nombre
        const rawImage =
          product.imageUrl || product.image_url || product.image || '';

        this.items.push({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
          imageUrl: normalizeImageUrl(rawImage),        // 👈 clave
          categoryName: product.category?.name ?? '',
        });
      }

      this.saveToStorage();
    },

    removeItem(productId) {
      this.items = this.items.filter((i) => i.id !== productId);
      this.saveToStorage();
    },

    setQuantity(productId, quantity) {
      const item = this.items.find((i) => i.id === productId);
      if (!item) return;

      const q = Number(quantity);
      if (isNaN(q) || q <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = q;
      }
      this.saveToStorage();
    },

    increase(productId) {
      const item = this.items.find((i) => i.id === productId);
      if (!item) return;
      item.quantity += 1;
      this.saveToStorage();
    },

    decrease(productId) {
      const item = this.items.find((i) => i.id === productId);
      if (!item) return;
      if (item.quantity <= 1) {
        this.removeItem(productId);
      } else {
        item.quantity -= 1;
        this.saveToStorage();
      }
    },

    clearCart() {
      this.items = [];
      this.saveToStorage();
    },
  },
});
