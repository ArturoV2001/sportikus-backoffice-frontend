<template>
  <LoginComponent v-if="!auth"/>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginComponent from '@/components/Login/LoginComponent.vue'

const auth = ref(false);
const router = useRouter();
const access_token = ref(null);
const startApplication =  () => {
  access_token.value = null;
  auth.value = false;
  if (localStorage.getItem('auth')) {
    access_token.value = localStorage.getItem('auth');
    let response = fetch(import.meta.env.VITE_API_BASE_URL, {
      headers:{
        Authorization: `Bearer ${access_token.value}`,
      }
    });
    console.log(response);
  }else {
    console.log("No hay ningun usuario logueado, login aqui")
    router.push({name: 'login'})
  }
}
onMounted(() => {
  startApplication();
})
</script>
