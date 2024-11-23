import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/components/Login/LoginComponent.vue'
import MainComponent from '@/components/MainComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainComponent,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginComponent,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
