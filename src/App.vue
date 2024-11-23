<template>
  <LoginComponent v-if="viewOption === 0"/>
  <MainComponent v-if="viewOption === 1"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authCheckSession } from '@/services/auth.js';
import LoginComponent from '@/components/Login/LoginComponent.vue'
import MainComponent from '@/components/MainComponent.vue'

const auth = ref(false);
const router = useRouter();
const response = ref();
const viewOption = ref();

const startApplication = async () => {
  viewOption.value =  0;
  auth.value = false;
  if (localStorage.getItem('auth')) {
    response.value = await authCheckSession()
      .catch(()=>{
        router.push({ name: 'login' });
      });
    if (response.value.authenticated === true) {
      localStorage.setItem('user', JSON.stringify(response.value.user));
      viewOption.value = 1;
    } else {
      //console.log("llega aqui");
      //router.push({ name: 'login' });
    }
  } else {
    //router.push({ name: 'login' });
  }
};

onMounted(() => {
  startApplication();
});
</script>
