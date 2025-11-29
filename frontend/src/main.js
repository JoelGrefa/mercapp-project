// frontend/src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useCartStore } from './store/cart';
import './style.css';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

// Inicializar carrito desde localStorage
const cartStore = useCartStore();
cartStore.initFromStorage();

app.mount('#app');
