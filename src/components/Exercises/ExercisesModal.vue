<template>
  <Dialog v-model:visible="visible" modal draggable header="Ejercicio" class="w-1/2">
    <alv-form :action="!id ? createElement : updateElement">
      <div class="flex items-center gap-4 mb-4">
        <label for="item.name" class="font-semibold w-24">Nombre: </label>
        <InputText v-model="itemData.name" id="item.name" class="flex-auto" autocomplete="off" placeholder="Nombre" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="description" class="font-semibold w-24">Descripción: </label>
        <Textarea v-model="itemData.description" id="description" class="flex-auto h-max" autoResize autocomplete="off" placeholder="Descripción" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="muscle_id" class="font-semibold w-24">Musculo: </label>
        <MuscleDropdown v-model="itemData.muscle_id" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        <button type="submit" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          <i class="pi pi-bookmark-fill mr-2" style="color: white; font-size: 1rem"/>
          Guardar
        </button>
      </div>
    </alv-form>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { Textarea } from 'primevue';
import { useToast } from 'primevue/usetoast';

const emit = defineEmits(['elementCreated']);
const toast = useToast();

import { ref } from 'vue';
import { getExerciseById, createExercise, updateExercise } from '@/services/exercise.js';
import MuscleDropdown from '@/components/Dropdowns/MuscleDropdown.vue';

const visible = ref(false);
const id = ref(null);
const itemData = ref({
  name: null,
  description: null,
  muscle_id: null,
});

const beforeOpen = async (key = null) => {
  id.value = null;
  itemData.value = {
    name: null,
    description: null,
    muscle_id: null,
  };
  visible.value = true;
  if (key) {
    await getExerciseById(key, Object.keys(itemData.value))
      .then(response => {
        id.value = key;
        itemData.value = response;
      });
  }
};

const createElement = async () => {
  await createExercise(itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Ejercicio agregado correctamente',
        life: 3000,
      });
      emit('elementCreated');
    })
    .catch(response => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 3000,
      });
    })
};

const updateElement = async () => {
  await updateExercise(id.value, itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Ejercicio actualizado correctamente',
        life: 3000,
      });
      emit('elementCreated');
    })
    .catch(response => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 3000,
      });
    })
};

defineExpose({ beforeOpen });
</script>
