<template>
  <Dialog v-model:visible="visible" modal draggable header="Padecimiento" class="w-1/2">
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
        <label for="cronic" class="font-semibold w-24">Cronico: </label>
        <button name="cronic" v-if="itemData.cronic === 0" @click="itemData.cronic = 1" class="w-full text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          <i class="pi pi-chevron-down mr-2" style="font-size: 1rem;color: white"/>
          No
        </button>
        <button name="cronic" v-else @click="itemData.cronic = 0" class="w-full text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
          <i class="pi pi-chevron-up mr-2" style="font-size: 1rem;color: white"/>
          Si
        </button>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        <button type="submit" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
import { ref } from 'vue';
import { getAilment, createAilment, updateAilment } from '@/services/ailment.js';

const emit = defineEmits(['elementCreated']);
const toast = useToast();
const visible = ref(false);
const id = ref(null);

const itemData = ref({
  name: null,
  description: null,
  cronic: 1,
});

const beforeOpen = async (key = null) => {
  id.value = null;
  itemData.value = {
    name: null,
    description: null,
    cronic: 1,
  };
  visible.value = true;
  if (key) {
    await getAilment(key, Object.keys(itemData.value))
      .then(response => {
        id.value = key;
        itemData.value = response;
      });
  }
};

const createElement = async () => {
  await createAilment(itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Padecimiento agregado correctamente',
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
  await updateAilment(id.value, itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Padecimiento actualizado correctamente',
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
