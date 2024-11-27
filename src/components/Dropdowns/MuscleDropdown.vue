<template>
  <div class="card flex justify-content-center w-full">
    <Dropdown
      v-model="internalValue"
      :options="item"
      filter
      optionLabel="name"
      :disabled="props.read"
      :loading="loading"
      placeholder="Musculo"
      class="w-full md:w-14rem"
      option-value="id"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { getMuscles } from '@/services/muscle.js';
import Dropdown from 'primevue/dropdown';

const loading = ref(true);
const item = ref([]);

// Define the props for v-model and other parameters
const props = defineProps({
  modelValue: { type: [String, Number, null], default: null }, // v-model binding
  read: { type: Boolean, default: false },
});

// Emit events for parent synchronization
const emit = defineEmits(['update:modelValue']);

// Internal value for v-model synchronization
const internalValue = ref(props.modelValue);

const beforeOpen = async () => {
  loading.value = true;
  await getMuscles({
    columns: JSON.stringify(["id", "name"]),
  }).then((response) => {
    loading.value = false;
    item.value = response.data;
  });
};

// Watch for changes in internal value and emit to parent
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});

// Sync internal value with prop changes
watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

onMounted(() => {
  beforeOpen();
});
</script>
