<template>
  <div id="app" class="w-full">
    <Toast />
    <div v-if="isLoading" class="flex items-center justify-center h-screen">
      <div class="text-center">
        <ProgressSpinner />
        <p class="mt-4 text-gray-600 text-lg">Cargando, por favor espera...</p>
      </div>
    </div>
    <div v-else>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authCheckSession } from '@/services/auth.js';
import Toast from 'primevue/toast';
import ProgressSpinner from 'primevue/progressspinner';

const adminPermission = inject('adminPermission');
const user = inject('user');
const router = useRouter();
const response = ref();
const isLoading = ref(true); // Bandera para controlar el estado de carga

const startApplication = async () => {
  if (localStorage.getItem('auth')) {
    response.value = await authCheckSession().catch(() => {
      router.push({ name: 'login' });
    });

    if (response.value?.authenticated) {
      user.value = response.value.user;
      adminPermission.value = user.value.user_type_id === 1;
    } else {
      router.push({ name: 'login' });
    }
  } else {
    router.push({ name: 'login' });
  }
  isLoading.value = false; // Marcar que la carga ha finalizado
};

onMounted(() => {
  startApplication();
});
</script>

<style scoped>
/* Centrar el spinner vertical y horizontalmente */
.h-screen {
  height: 100vh;
}

.text-center {
  text-align: center;
}
</style>
