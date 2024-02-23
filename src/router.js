import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/look-dulplicate-checking' },
  {
    path: '/look-dulplicate-checking',
    component: () => import('/packages/look-dulplicate-checking/src/demo.vue'),
  },
  {
    path: '/look-performance-cms',
    component: () => import('/packages/look-performance-cms/src/demo.vue'),
  },
  {
    path: '/look-performance-leader',
    component: () => import('/packages/look-performance-leader/src/demo.vue'),
  },
  {
    path: '/look-performance-unit',
    component: () => import('/packages/look-performance-unit/src/demo.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
