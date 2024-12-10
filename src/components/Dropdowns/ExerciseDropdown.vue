<template>
  <div class="card flex justify-content-center w-full">
    <Dropdown
      v-model="internalValue" :options="item" filter optionLabel="name" optionValue="id"
      :disabled="props.read" :loading="loading" placeholder="Ejercicios" class="w-full md:w-14rem" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getExercises } from '@/services/exercise.js';
import Dropdown from 'primevue/dropdown';

const props = defineProps({
  modelValue: { type: [String, Number, null], default: null },
  read: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

const loading = ref(true);
const item = ref([]);

const chargeData = async () => {
  loading.value = true;
  try {
    const response = await getExercises({
      columns: JSON.stringify(["id", "name"]),
      filters: JSON.stringify(props.filters),
    });
    item.value = response.data;
  } catch (error) {
    console.error("Error al cargar ejercicios:", error);
  } finally {
    loading.value = false;
  }
};

watch(() => props.filters, () => {
    chargeData();
  }, { deep: true, immediate: true }
);

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue);
  }
);

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
  }, { immediate: true }
);

onMounted(() => {
  chargeData();
});
</script>

