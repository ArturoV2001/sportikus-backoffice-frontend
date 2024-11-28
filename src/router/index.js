import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from '@/components/Login/LoginComponent.vue'
import MainComponent from '@/components/MainComponent.vue'
import DashboardView from '@/components/Dashboard/DashboardView.vue'
import ExercisesTable from '@/components/Exercises/ExercisesTable.vue'
import AilmentsTable from '@/components/Ailments/AilmentsTable.vue'
import UsersTable from '@/components/Users/UsersTable.vue'
import ProfileView from '@/components/Profile/ProfileView.vue'

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
  {
    path: 'ailments',
    name: 'ailments',
    components: {
      mainComponent: AilmentsTable,
    },
  },
  {
    path: 'users',
    name: 'users',
    components: {
      mainComponent: UsersTable,
    },
  },
  {
    path: 'profile',
    name: 'profile',
    components: {
      mainComponent: ProfileView,
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
