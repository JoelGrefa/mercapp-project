import { defineStore } from 'pinia';

const STORAGE_KEY = 'mercapp-cart';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [], // { id, name, price, quantity, imageUrl }
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((acc, item) => acc + item.quantity, 0),

    totalPrice: (state) =>
      state.items.reduce(
        (acc, item) => acc + item.quantity * Number(item.price),
        0
      ),
  },

  actions: {
    loadFromStorage() {
      if (typeof window === 'undefined') return;
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          this.items = JSON.parse(raw);
        } catch {
          this.items = [];
        }
      }
    },

    persist() {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    },

    addItem(product) {
      const existing = this.items.find((i) => i.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        });
      }
      this.persist();
    },

    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id);
      this.persist();
    },

    updateQuantity(id, quantity) {
      const item = this.items.find((i) => i.id === id);
      if (!item) return;
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.persist();
      }
    },

    clearCart() {
      this.items = [];
      this.persist();
    },
  },
});
