import { createRouter, createWebHistory } from 'vue-router';

// Lazy loading de vistas
const HomeView = () => import('../views/HomeView.vue');
const ProductDetailView = () => import('../views/ProductDetailView.vue');
const ProductFormView = () => import('../views/ProductFormView.vue'); // 🔹 NUEVO
const CartView = () => import('../views/CartView.vue');
const AboutView = () => import('../views/AboutView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  // 🔹 RUTA PARA CREAR PRODUCTO (importante que vaya ANTES de /product/:id)
  {
    path: '/product/new',
    name: 'product-new',
    component: ProductFormView,
  },
  // 🔹 RUTA PARA EDITAR PRODUCTO
  {
    path: '/product/:id/edit',
    name: 'product-edit',
    component: ProductFormView,
    props: true,
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView,
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
