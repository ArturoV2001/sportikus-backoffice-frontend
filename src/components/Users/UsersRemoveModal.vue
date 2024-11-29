
<template>
  <Dialog v-model:visible="visible" modal draggable header="Eliminar usuario" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">¿Estás seguro de que deseas eliminar al usuario de la plataforma?</span>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Eliminar" severity="danger" @click="remove"></Button>
    </div>
  </Dialog>
</template>


<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import { ref } from 'vue';
import {deleteUser} from '@/services/user.js'
import { useToast } from 'primevue/usetoast'

const emit = defineEmits(['elementRemoved']);

const visible = ref(false);
const name = ref(null);
const id = ref(null);
const toast = useToast();

const beforeOpen = (val, key) =>{
  visible.value = true;
  name.value = val;
  id.value = key;
};

const remove = async () => {
  await deleteUser(id.value)
    .then(() => {
      toast.add({
        severity:'success',
        summary:'Éxito',
        detail:'El elemento ha sido eliminado!',
        life:3000,
      })
      emit('elementRemoved');
      visible.value = false;
    })
    .catch(response => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 3000,
      })
    })
}

defineExpose({beforeOpen});
</script>


