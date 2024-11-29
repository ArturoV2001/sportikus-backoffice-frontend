<template>
  <Dialog v-model:visible="visible" modal draggable header="Nueva medición" class="w-1/2">
    <alv-form :action="createElement">
      <div class="flex items-center gap-4 mb-4">
        <label for="item.heart_frequency" class="font-semibold w-1/2">Frecuencia cardiaca: </label>
        <InputNumber v-model="itemData.heart_frequency" id="item.heart_frequency" class="flex-auto w-1/2" min="0" :maxFractionDigits="0" autocomplete="off" placeholder="0 LPM" suffix=" LPM" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.steps" class="font-semibold w-1/2">Pasos: </label>
        <InputNumber v-model="itemData.steps" id="item.steps" class="flex-auto w-1/2" min="0" :maxFractionDigits="0" autocomplete="off" placeholder="0 pasos" suffix=" pasos" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.distance" class="font-semibold w-1/2">Distancia recorrida: </label>
        <InputNumber v-model="itemData.distance" id="item.distance" class="flex-auto w-1/2" min="0" :maxFractionDigits="2" autocomplete="off" placeholder="0 km" suffix=" km" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.oxygenation" class="font-semibold w-1/2">Saturación de oxígeno: </label>
        <InputNumber v-model="itemData.oxygenation" id="item.oxygenation" class="flex-auto w-1/2" min="0" :max="99.99" :maxFractionDigits="2" autocomplete="off" placeholder="0%" suffix="%" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.sleep_quantity" class="font-semibold w-1/2">Cantidad de sueño: </label>
        <InputNumber v-model="itemData.sleep_quantity" id="item.sleep_quantity" class="flex-auto w-1/2" min="0" :max="1200" :maxFractionDigits="0" autocomplete="off" placeholder="0 minutos" suffix=" minutos" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.sleep_quality_awake" class="font-semibold w-1/2">Calidad del sueño, tiempo despierto: </label>
        <InputNumber v-model="itemData.sleep_quality_awake" id="item.sleep_quality_awake" class="flex-auto w-1/2" min="0" :max="1200" :maxFractionDigits="0" autocomplete="off" placeholder="0 minutos" suffix=" minutos" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.sleep_quality_rem" class="font-semibold w-1/2">Calidad del sueño, fase REM: </label>
        <InputNumber v-model="itemData.sleep_quality_rem" id="item.sleep_quality_rem" class="flex-auto w-1/2" min="0" :max="1200" :maxFractionDigits="0" autocomplete="off" placeholder="0 minutos" suffix=" minutos" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.sleep_quality_core" class="font-semibold w-1/2">Calidad del sueño, fase ligera/intermedia: </label>
        <InputNumber v-model="itemData.sleep_quality_core" id="item.sleep_quality_core" class="flex-auto w-1/2" min="0" :max="1200" :maxFractionDigits="0" autocomplete="off" placeholder="0 minutos" suffix=" minutos" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="item.sleep_quality_deep" class="font-semibold w-1/2">Calidad del sueño, fase profunda: </label>
        <InputNumber v-model="itemData.sleep_quality_deep" id="item.sleep_quality_deep" class="flex-auto w-1/2" min="0" :max="1200" :maxFractionDigits="0" autocomplete="off" placeholder="0 minutos" suffix=" minutos" />
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
import InputNumber from 'primevue/inputnumber';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { createBiometricData } from '@/services/biometric_data.js';

const emit = defineEmits(['elementCreated']);
const toast = useToast();
const visible = ref(false);
const id = ref(null);
const user = ref([]);

const itemData = ref({
  heart_frequency:null,
  steps:null,
  distance:null,
  oxygenation:null,
  sleep_quantity:null,
  sleep_quality_awake:null,
  sleep_quality_rem:null,
  sleep_quality_core:null,
  sleep_quality_deep:null,
});

const beforeOpen = async () => {
  id.value = null;
  user.value = JSON.parse(localStorage.getItem('user'));
  itemData.value = {
    heart_frequency:null,
    steps:null,
    distance:null,
    oxygenation:null,
    sleep_quantity:null,
    sleep_quality_awake:null,
    sleep_quality_rem:null,
    sleep_quality_core:null,
    sleep_quality_deep:null,
  };
  visible.value = true;
};

const createElement = async () => {
  await createBiometricData(itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Medición agregada correctamente',
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
