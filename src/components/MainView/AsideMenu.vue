<template>
  <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-1/5 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li>
          <router-link :to="{path: '/dashboard'}" @click="spin(1)" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 1 ? 'pi pi-home pi-spin' : 'pi pi-home'" style="font-size: 1.5rem"/>
            <span class="ms-3">Dashboard</span>
          </router-link>
        </li>
        <li>
          <hr>
          <span class="flex my-2 items-center pl-2 pt-2 pb-2 text-gray-900 rounded-lg dark:text-white">Catalogos</span>
          <hr>
        </li>
        <li>
          <router-link :to="{path: '/exercises'}" @click="spin(2)" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 2 ? 'pi pi-list pi-spin' : 'pi pi-list'" style="font-size: 1.5rem"/>
            <span class="ms-3">Ejercicios</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/ailments'}" @click="spin(3)" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 3 ? 'pi pi-id-card pi-spin' : 'pi pi-id-card'" style="font-size: 1.5rem"/>
            <span class="ms-3">Padecimientos</span>
          </router-link>
        </li>
        <li>
          <router-link v-if="adminPermission" :to="{path: '/users'}" @click="spin(4)" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 4 ? 'pi pi-users pi-spin' : 'pi pi-users'" style="font-size: 1.5rem"/>
            <span class="ms-3">Usuarios</span>
          </router-link>
        </li>
        <li>
          <hr>
          <span class="flex my-2 items-center pl-2 pt-2 pb-2 text-gray-900 rounded-lg dark:text-white">Mi espacio</span>
          <hr>
        </li>
        <li>
          <router-link :to="{path: '/biometric-data'}" @click="spin(5)" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 5 ? 'pi pi-heart pi-spin' : 'pi pi-heart'" style="font-size: 1.5rem"/>
            <span class="ms-3">Mediciones</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/recommendations'}" @click="spin(6)" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 6 ? 'pi pi-address-book pi-spin' : 'pi pi-address-book'" style="font-size: 1.5rem"/>
            <span class="ms-3">Mis Recomendaciones</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{path: '/routine'}" @click="spin(7)" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 7 ? 'pi pi-file-edit pi-spin' : 'pi pi-file-edit'" style="font-size: 1.5rem"/>
            <span class="ms-3">Mi Rutina</span>
          </router-link>
        </li>
        <li>
          <hr>
          <span class="flex my-2 items-center pl-2 pt-2 pb-2 text-gray-900 rounded-lg dark:text-white">Sobre la App</span>
          <hr>
        </li>
        <li>
          <button @click="()=>{spin(8); termsModal.beforeOpen()}" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <i :class="selectedItem === 8 ? 'pi pi-lock pi-spin' : 'pi pi-lock'" style="font-size: 1.5rem"/>
            <span class="ms-3">Terminos y condiciones</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
  <TermsAndConditions ref="termsModal"/>
</template>


<script setup>
import { inject, ref } from 'vue'
import TermsAndConditions from '@/components/GlobalComponents/TermsAndConditions.vue'

const adminPermission = inject('adminPermission');
const termsModal = ref(null);

const selectedItem = ref(0);
const spin = (index) => {
  selectedItem.value = index;
  setTimeout(() => {
    selectedItem.value = 0;
  },2000)
}
</script>
