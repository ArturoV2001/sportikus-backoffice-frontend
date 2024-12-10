<template>
  <div class="w-full justify-content-center">
    <div class="bg-gray-100 h-auto items-center justify-center rounded-lg pb-20">
      <div class="w-full flex items-center justify-between mr-2 mb-4 pt-6 pl-20 pr-6 pb-2">
        <h1 class="text-3xl font-semibold whitespace-nowrap dark:text-white mr-2">
          Rutina
        </h1>
        <div class="flex">
          <button
            @click="modal.beforeOpen(true)"
            class=" mr-14 ml-4 inline-flex items-center text-white bg-[#16313C] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center">
            <i class="pi pi-plus-circle mr-2"/>
            <span class="text-md">Cambiar mi rutina</span>
          </button>
        </div>
      </div>
      <div v-if="routine && routine.data.length > 0" class="bg-white shadow-lg rounded-lg p-6 mx-20 mt-4">
        <h2 v-if="routine.data[0].ailment_name" class="text-lg font-semibold text-gray-800 mb-2">
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
          {{ routine.data[0].ailment_routine_description ? routine.data[0].ailment_routine_description : noneAilmentDescription }}
        </p>
      </div>

      <div v-for="(exercises, day) in routineExercises" :key="day" class="mt-4 px-10 py-2 rounded-xl">
        <h2 class="text-xl font-semibold mb-2 ml-4">Día {{ day }}</h2>
        <DataTable :value="exercises" class="p-datatable-striped">
          <Column class="w-2/5" field="exercise_name" header="Ejercicio"></Column>
          <Column class="w-1/5" field="sets" header="Sets"></Column>
          <Column class="w-1/5" field="repetitions" header="Repeticiones"></Column>
          <Column v-if="adminPermission" class="w-1/5" header="Opciones">
            <template #body="slotProps">
              <div class="flex justify-end">
                <button
                  class="inline-flex m-1 text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                  @click="routineExerciseModal.beforeOpen({id: slotProps.data.id})"
                  v-tooltip.top="'Editar'">
                  <i class="pi pi-pen-to-square" />
                </button>
                <button
                  class="inline-flex m-1 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                  @click="routineExerciseRemoveModal.beforeOpen(slotProps.data.exercise_name, slotProps.data.id)"
                  v-tooltip.top="'Eliminar'">
                  <i class="pi pi-trash" />
                </button>
              </div>
            </template>
          </Column>

        </DataTable>
        <div class="flex justify-end gap-2">
          <button
            v-if="adminPermission"
            @click="routineExerciseModal.beforeOpen({day:day, routine_id: user.routine_id})"
            class="ml-4 mt-2 inline-flex items-center text-white bg-[#16313C] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center">
            <i class="pi pi-plus-circle mr-2"/>
            <span class="text-md">Añadir ejercicio</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <RoutineExerciseRemove ref="routineExerciseRemoveModal" @update-routine="chargeData" />
  <RoutineExerciseModal ref="routineExerciseModal" @update-routine="chargeData" />
  <RoutineModal ref="modal" @routineAssigned="chargeData" />
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { getRoutineExercises } from '@/services/routine.js';
import RoutineModal from '@/components/Routine/RoutineModal.vue';
import { Column, DataTable } from 'primevue';
import RoutineExerciseModal from '@/components/Routine/RoutineExerciseModal.vue'
import RoutineExerciseRemove from '@/components/Routine/RoutineExerciseRemove.vue'

const routineExerciseRemoveModal = ref(null);
const adminPermission = inject('adminPermission');
const user = inject('user');
const routine = ref({ data: [] }); // Inicialización con estructura esperada
const routineExercises = ref({});
const modal = ref(null);
const routineExerciseModal = ref(null);
const noneAilmentDescription = 'Para usuarios sin padecimientos, las rutinas se orientan a mejorar la condición física general, equilibrando fuerza, resistencia y movilidad mediante ejercicios básicos y efectivos. Es importante mantener una intensidad progresiva y variada, adaptándola a los objetivos personales.';

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
