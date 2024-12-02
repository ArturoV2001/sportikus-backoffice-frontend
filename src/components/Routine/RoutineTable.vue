<template>
  <div class="w-full justify-content-center">
    <div class="bg-gray-100 h-auto items-center justify-center rounded-lg">
      <h1
        class="self-center text-xl font-semibold sm:text-3xl whitespace-nowrap dark:text-white pl-8 pt-6 pb-2 ml-14">
        Rutina
      </h1>
      <div v-if="routine && routine.data.length > 0" class="bg-white shadow-lg rounded-lg p-6 mx-20 mt-4">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">
          Padecimiento del usuario:
          <span class="text-indigo-600">{{ routine.data[0].ailment_name }}</span>
        </h2>
        <p class="text-gray-600 mb-2">
          <span class="font-medium text-gray-800">Duración de la rutina:</span>
          {{ routine.data[0].duration }} minutos (aprox)
        </p>
        <p class="text-gray-600 mb-2">
          <span class="font-medium text-gray-800">Frecuencia:</span>
          {{ routine.data[0].frequency }} días
        </p>
        <p class="text-gray-600 text-justify">
          <span class="font-medium text-gray-800">Objetivos y recomendaciones:</span>
          {{ routine.data[0].ailment_routine_description }}
        </p>
      </div>

      <div v-for="(exercises, day) in routineExercises" :key="day" class="mt-4 px-10 py-2 rounded-xl">
        <h2 class="text-xl font-semibold mb-2 ml-4">Día {{ day }}</h2>
        <DataTable :value="exercises" class="p-datatable-striped">
          <Column class="w-2/4" field="exercise_name" header="Ejercicio"></Column>
          <Column class="w-1/4" field="sets" header="Sets"></Column>
          <Column class="w-1/4" field="repetitions" header="Repeticiones"></Column>
        </DataTable>
      </div>
    </div>
  </div>

  <RoutineModal ref="modal" @routineAssigned="chargeData" />
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { getRoutineExercises } from '@/services/routine.js';
import RoutineModal from '@/components/Routine/RoutineModal.vue';
import { Column, DataTable } from 'primevue';

const user = inject('user');
const routine = ref({ data: [] }); // Inicialización con estructura esperada
const routineExercises = ref({});
const modal = ref(null);

const beforeOpen = () => {
  routine.value = { data: [] }; // Reiniciar como objeto vacío
  routineExercises.value = {};
  if (user.value.routine_id) {
    chargeData();
  } else {
    modal.value.beforeOpen();
  }
};

const chargeData = async () => {
  await getRoutineExercises({
    routine_id: user.value.routine_id,
  }).then((response) => {
    routine.value = response.routine || { data: [] }; // Asegurar estructura
    routineExercises.value = response.routine_exercises.data.reduce(
      (acc, exercise) => {
        if (!acc[exercise.day]) {
          acc[exercise.day] = [];
        }
        acc[exercise.day].push(exercise);
        return acc;
      },
      {}
    );
  });
};

onMounted(() => {
  beforeOpen();
});
</script>
