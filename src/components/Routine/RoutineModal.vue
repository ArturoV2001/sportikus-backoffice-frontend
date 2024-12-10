<template>
  <Dialog
    v-model:visible="visible" :closable="close" modal draggable
    :header="adminPermission ? 'Administrar Rutina' : 'Asignar rutina'" class="w-1/3 px-4">
    <alv-form :action="assignRoutineAction">
    <div class="items-center text-center gap-4 mb-4">
      <label for="ailment_button" class="font-semibold w-full">{{adminPermission ? 'Padecimiento' : '¿Sufres de algun padecimiento?'}}</label>
      <button name="ailment_button" v-if="!ailmentExist" @click="() => {ailmentExist = true; ailment_id = -1}" class="w-full text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
        No
      </button>
      <button name="ailment_button" v-else @click="() => {ailmentExist = false; ailment_id = null}" class="w-full text-white bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
        Si
      </button>
    </div>
    <div :hidden="!ailmentExist" class="items-center text-center gap-4 mb-4">
      <label for="ailment_button" class="font-semibold w-1/2">Selecciona el padecimiento</label>
      <AilmentDropdown v-model="ailment_id" />
    </div>
    <div class="items-center text-center gap-4 mb-8">
      <label for="ailment_button" class="font-semibold w-1/2">{{adminPermission ? 'Frecuencia de la rutina: ' : 'Selecciona la frecuencia de tu rutina: '}}</label>
      <Dropdown
        v-model="frequency" :options="filteredOptions" optionLabel="name" optionValue="id"
        placeholder="Frecuencia en días" class="w-full md:w-14rem" />
    </div>
    <div class="items-center text-center gap-4 mb-4">
      <button :disabled="isSubmitted" type="submit" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        <i class="pi pi-sparkles mr-2" style="color: white; font-size: 1rem"/>
        Generar rutina
      </button>
    </div>
    </alv-form>
  </Dialog>
</template>

<script setup>

import { inject, ref } from 'vue';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown'
import { assignRoutine } from '@/services/routine.js';
import AilmentDropdown from '@/components/Dropdowns/AilmentDropdown.vue'
import { useToast } from 'primevue/usetoast'

const adminPermission = inject('adminPermission');
const toast = useToast();
const isSubmitted = ref(false);
const user = inject('user');
const emit = defineEmits(['routineAssigned']);
const ailmentExist = ref(false);
const ailment_id = ref();
const visible = ref(false);
const frequency = ref(null);
const close = ref(false);

const filteredOptions = [
  { id: 2, name: "2 días" },
  { id: 3, name: "3 días" },
  { id: 6, name: "6 días" },
];

const assignRoutineAction = async () => {
  isSubmitted.value = true;
  await assignRoutine({
    frequency: frequency.value,
    ailment_id: ailment_id.value
  }).then(response => {
    if (response.success) {
      user.value.routine_id = response.routine_id;
      emit('routineAssigned');
      toast.add({
        severity:'success',
        summary:'¡Felicidades!',
        detail:'Se te ha asignado una rutina.',
        life:3000,
      })
      visible.value = false;
    }else{
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: response.message,
        life: 3000,
      });
    }
  })
    .finally(() => {isSubmitted.value = false});
}

const beforeOpen = (canClose = false) => {
  isSubmitted.value = false;
  close.value = canClose;
  ailmentExist.value = false;
  ailment_id.value = null;
  visible.value = true;
  frequency.value = null;
}

defineExpose({ beforeOpen})
</script>
