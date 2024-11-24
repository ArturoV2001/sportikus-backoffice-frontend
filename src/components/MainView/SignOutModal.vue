
<template>
  <Dialog v-model:visible="visible" modal draggable header="Cerrar sesión" :style="{ width: '25rem' }">
    <div v-if="!signOutOk">
      <span class="text-surface-500 dark:text-surface-400 block mb-8">¿Estás seguro de que deseas cerrar sesión?</span>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        <Button type="button" label="Cerrar sesión" severity="danger" @click="logout"></Button>
      </div>
    </div>
    <div v-else>
      <span class="text-surface-500 dark:text-surface-400 block mb-8">Hasta luego!</span>
    </div>
  </Dialog>
</template>


<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { ref } from "vue";
import {authLogout} from '@/services/auth.js'

const visible = ref(false);
const signOutOk = ref(false);
const beforeOpen = () =>{
  signOutOk.value = false;
  visible.value = true;
};

const logout = async () =>{
  await authLogout().then(() => {
    signOutOk.value = true;
    setTimeout(()=>{
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      window.location.href = '/login';
    },3000);
  });
}

defineExpose({beforeOpen});
</script>


