import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/components/Login/LoginComponent.vue'
import MainComponent from '@/components/MainComponent.vue'
import DashboardView from '@/components/Dashboard/DashboardView.vue'
import ExercisesTable from '@/components/Exercises/ExercisesTable.vue'

const mainComponentRoutes = [
  {
    path: 'dashboard',
    name: 'dashboard',
    components: {
      mainComponent: DashboardView,
    },
  },
  {
    path: 'exercises',
    name: 'exercises',
    components: {
      mainComponent: ExercisesTable,
    },
  },
];

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainComponent,
    children: mainComponentRoutes,
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
