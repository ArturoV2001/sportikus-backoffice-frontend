<template>
  <RouterView/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authCheckSession } from '@/services/auth.js';

const auth = ref(false);
const router = useRouter();
const response = ref();

const startApplication = async () => {
  auth.value = false;
  if (localStorage.getItem('auth')) {
    response.value = await authCheckSession()
      .catch(()=>{
        router.push({ name: 'login' });
      });
    if (response.value.authenticated === true) {
      localStorage.setItem('user', JSON.stringify(response.value.user));
      router.push({ name: 'dashboard' });
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
