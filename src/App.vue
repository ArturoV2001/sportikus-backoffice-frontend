<template>
  <div id="app">
    <Toast/>
    <RouterView/>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { authCheckSession } from '@/services/auth.js';
import Toast from 'primevue/toast';

const adminPermission = inject('adminPermission');
const user = inject('user');
const router = useRouter();
const response = ref();

const startApplication = async () => {
  if (localStorage.getItem('auth')) {
    response.value = await authCheckSession()
      .catch(()=>{
        router.push({ name: 'login' });
      });
    if (response.value.authenticated === true) {
      user.value = response.value.user;
      adminPermission.value = user.value.user_type_id === 1;
    } else {
      router.push({ name: 'login' });
    }
  } else {
    router.push({ name: 'login' });
  }
};

onMounted(() => {
  startApplication();
});
</script>
