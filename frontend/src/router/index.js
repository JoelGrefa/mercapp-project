import { createRouter, createWebHistory } from 'vue-router';

// Vistas (lazy loading)
const HomeView = () => import('../views/HomeView.vue');
const ProductDetailView = () => import('../views/ProductDetailView.vue');
const CartView = () => import('../views/CartView.vue');
const AboutView = () => import('../views/AboutView.vue');
const ProductFormView = () => import('../views/ProductFormView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },

  // 🔹 Crear nuevo producto
  {
    path: '/product/new',
    name: 'product-create',
    component: ProductFormView,
  },

  // 🔹 Editar producto
  {
    path: '/product/:id/edit',
    name: 'product-edit',
    component: ProductFormView,
    props: true,
  },

  // 🔹 Detalle de producto (lo que se ve cuando haces clic en la tarjeta)
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

  // 🔹 404
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
