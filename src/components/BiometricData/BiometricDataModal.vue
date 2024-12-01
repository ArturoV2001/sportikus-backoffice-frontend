
<template>
  <Dialog
    v-model:visible="visible"
    :closable="modalScreenOption !== 2"
    modal
    draggable
    :header="modalScreenOption === 3 ? 'Tu Recomendación'
    : modalScreenOption === 1 ? 'Nueva medición'
    : '' "
    class="w-1/2 px-4"
  >
    <div v-if="modalScreenOption === 1">
      <!-- Formulario -->
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
        <div class="flex justify-end gap-2 pt-4">
          <Button type="button" severity="secondary" @click="simulateMeasurement">
            <i class="pi pi-stopwatch"/>
            Simular datos
          </Button>
          <button type="submit" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <i class="pi pi-bookmark-fill mr-2" style="color: white; font-size: 1rem"/>
            Guardar
          </button>
        </div>
      </alv-form>
    </div>
    <!-- Barra de progreso -->
    <div v-if="modalScreenOption === 2" class="mt-4">
      <h1 class="font-semibold text-center text-2xl w-full pb-6">Generando recomendación...</h1>
      <ProgressBar
        :value="progressBarValue"
        style="--p-progressbar-value-background:#4f46e5;"/>
    </div>
    <div v-if="modalScreenOption === 3">
      <div v-if="recommendationSuccess" class="w-full text-center">
        <i v-if="recommendationSuccess" class="pi pi-address-book
" style="font-size: 2rem;"/>
      </div>
      <div class="p-4 text-justify" v-html="recommendation"></div>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import ProgressBar from "primevue/progressbar";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { generateRecommendation } from "@/services/biometric_data.js";

const toast = useToast();

const progressBarValue = ref();
const progressBarIntervalSize = ref();
const progressBarInterval = ref();
const visible = ref(false);
const modalScreenOption = ref(1);
const recommendation = ref();
const recommendationSuccess = ref(false);


const itemData = ref({
  heart_frequency: null,
  steps: null,
  distance: null,
  oxygenation: null,
  sleep_quantity: null,
  sleep_quality_awake: null,
  sleep_quality_rem: null,
  sleep_quality_core: null,
  sleep_quality_deep: null,
});

const beforeOpen = () => {
  progressBarIntervalSize.value = 2000;
  visible.value = true;
  modalScreenOption.value = 1;
  recommendation.value = null;
  itemData.value = {};
  clearInterval(progressBarInterval.value);
  progressBarInterval.value = null;

};

const createElement = async () => {
  await generateRecommendation(itemData.value)
    .then((response) => {
      recommendation.value = response.data.recommendation;
      recommendationSuccess.value = response.success;
      progressBarIntervalSize.value = recommendationSuccess.value ? 400 : 30;
      startProgress();
    })
    .catch((error) => {
      setTimeout(() => {
        modalScreenOption.value = 1;
        toast.add({ severity: "error", summary: "Error", detail: error.message, life: 3000 });
      }, 3000);
    });
};

const startProgress = () => {
  modalScreenOption.value = 2;
  progressBarValue.value = 0;
  progressBarInterval.value = setInterval(() => {
    let newValue = progressBarValue.value + Math.floor(Math.random() * 10) + 1;
    if (newValue >= 100) {
      newValue = 100;
      clearInterval(progressBarInterval.value);
      progressBarInterval.value = null;
      let delay = recommendationSuccess.value ? 2000 : 0;
      setTimeout(() => {
        modalScreenOption.value = 3;
      }, delay);
    }
    progressBarValue.value = newValue;
  }, progressBarIntervalSize.value);
};

const simulateMeasurement = () => {
  itemData.value = {
    heart_frequency: Math.floor(Math.random() * (120 - 60 + 1)) + 60, // 60-120 LPM (frecuencia cardíaca típica)
    steps: Math.floor(Math.random() * (20000 - 1000 + 1)) + 1000, // 1000-20000 pasos
    distance: (Math.random() * (10 - 1) + 1).toFixed(2), // 1-10 km, con 2 decimales
    oxygenation: (Math.random() * (100 - 90) + 90).toFixed(2), // 90-100%, con 2 decimales
    sleep_quantity: Math.floor(Math.random() * (600 - 300 + 1)) + 300, // 300-600 minutos (5-10 horas)
    sleep_quality_awake: Math.floor(Math.random() * (60 + 1)), // 0-60 minutos despierto
    sleep_quality_rem: Math.floor(Math.random() * (120 - 60 + 1)) + 60, // 60-120 minutos en REM
    sleep_quality_core: Math.floor(Math.random() * (240 - 120 + 1)) + 120, // 120-240 minutos en fase ligera/intermedia
    sleep_quality_deep: Math.floor(Math.random() * (120 - 60 + 1)) + 60, // 60-120 minutos en fase profunda
  };
};



defineExpose({beforeOpen});

</script>
