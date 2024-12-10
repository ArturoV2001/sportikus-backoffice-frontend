<template>
  <Dialog v-model:visible="visible" modal draggable header="Ejercicio" class="w-1/2">
    <alv-form :action="!id ? createElement : updateElement">
      <div class="flex items-center gap-4 mb-4" v-if="!id">
        <label for="item.name" class="font-semibold w-24">Musculo: </label>
        <MuscleDropdown v-model="muscle_id" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="exercise" class="font-semibold w-24">Ejercicio: </label>
        <ExerciseDropdown
          :read="!muscle_id"
          name="exercise"
          v-model="itemData.exercise_id"
          :filters="exerciseFilters"/>
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="sets" class="font-semibold w-24">Series: </label>
        <InputNumber class="w-full" v-model="itemData.sets" name="sets" :min="1" :max="8" :max-fraction-digits="0" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="repetitions" class="font-semibold w-24">Repeticiones: </label>
        <InputNumber class="w-full" v-model="itemData.repetitions" name="repetitions" :min="1" :max="50" :max-fraction-digits="0" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
        <button :disabled="isSubmitted" type="submit" class="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
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
import { computed, ref } from 'vue'
import { getRoutineExerciseById, createRoutineExercise, updateRoutineExercise } from '@/services/routine_exercise.js';
import MuscleDropdown from '@/components/Dropdowns/MuscleDropdown.vue';
import ExerciseDropdown from '@/components/Dropdowns/ExerciseDropdown.vue'

const muscle_id = ref();
const isSubmitted = ref(false);
const emit = defineEmits(['updateRoutine']);
const toast = useToast();
const exerciseFilters = computed(() => ({
  muscle_id: { value: muscle_id.value }
}));
const visible = ref(false);
const id = ref(null);
const itemData = ref({
  repetitions:null,
  sets:null,
  routine_id:null,
  exercise_id:null,
  day:null,
});

const beforeOpen = async (data) => {
  muscle_id.value = null;
  isSubmitted.value = false;
  id.value = null;
  itemData.value = {
    repetitions:null,
    sets:null,
    routine_id:data.routine_id,
    exercise_id:null,
    day:data.day,
  };
  visible.value = true;
  if (data.id) {
    await getRoutineExerciseById(data.id, Object.keys(itemData.value))
      .then(response => {
        id.value = data.id;
        itemData.value = response;
      });
  }
};

const createElement = async () => {
  isSubmitted.value = true;
  await createRoutineExercise(itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Ejercicio agregado correctamente',
        life: 3000,
      });
      emit('updateRoutine');
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message;
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      });
    })
    .finally(() => {isSubmitted.value = false});
};

const updateElement = async () => {
  isSubmitted.value = true;
  await updateRoutineExercise(id.value, itemData.value)
    .then(() => {
      visible.value = false;
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Ejercicio actualizado correctamente',
        life: 3000,
      });
      emit('updateRoutine');
    })
    .catch((error) => {
      const errorMessage = error.response?.data?.message;
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      });
    })
    .finally(() => {isSubmitted.value = false});
};

defineExpose({ beforeOpen });
</script>
