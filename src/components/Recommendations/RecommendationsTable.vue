<template>
  <div class="w-full justify-content-center">
    <div class="bg-gray-100 h-auto items-center justify-center pb-4 rounded-lg">
      <h1 class="self-center text-xl font-semibold sm:text-3xl whitespace-nowrap dark:text-white pl-8 pt-6 pb-2">Tus Recomendaciones</h1>
      <div class="flex">
        <div class="w-5/6  mx-auto p-4">
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="flex items-center justify-between px-6 py-3 bg-gray-700">
              <button @click="prevMonth" class="text-white">Anterior</button>
              <h2 ref="currentMonthRef" class="text-white"></h2>
              <button @click="nextMonth" class="text-white">Siguiente</button>
            </div>
            <div class="grid grid-cols-7 gap-2 p-4" ref="calendarRef">
              <!-- Calendar Days Go Here -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RecommendationsModal ref="modal"/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getRecommendationUsers } from '@/services/recommendation_user.js'
import { columns } from '@/resources/Columns/RecommendationUsersColumns.js'
import {inject} from 'vue'
import RecommendationsModal from '@/components/Recommendations/RecommendationsModal.vue'

const modal = ref(null);
const user = inject('user');
const calendarRef = ref(null); // Referencia al calendario
const currentMonthRef = ref(null); // Referencia al encabezado del mes
const currentYear = ref(new Date().getFullYear()); // Año actual
const currentMonth = ref(new Date().getMonth()); // Mes actual
const itemData = ref([]);
const defaultColumns = ref([]);
const filters = ref({});

const beforeOpen = async () => {
  currentMonth.value = new Date().getMonth();
  currentYear.value = new Date().getFullYear();
  defaultColumns.value = columns;
  filters.value = {};
  filters.value['user_id'] = { value: user.id, matchMode: 'contains' };
  await getRecommendationUsers({
    columns: JSON.stringify(defaultColumns.value.map(i => i.field)),
    filters: JSON.stringify(filters.value),
  })
    .then(response => {
      itemData.value = response.data; // Asigna solo el arreglo 'data'
    });
  generateCalendar(currentYear.value, currentMonth.value);
};

const generateCalendar = (year, month) => {
  const calendarElement = calendarRef.value;
  const currentMonthElement = currentMonthRef.value;
  if (!calendarElement || !currentMonthElement) {
    console.error("No se pudieron encontrar los elementos del calendario.");
    return;
  }
  calendarElement.innerHTML = "";
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  currentMonthElement.innerText = `${monthNames[month]} ${year}`;

  // Procesar itemData para obtener solo el elemento más reciente por fecha
  const recentData = processItemData(itemData.value);

  // Crear encabezados para los días de la semana
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  daysOfWeek.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "text-center font-semibold";
    dayElement.innerText = day;
    calendarElement.appendChild(dayElement);
  });

  // Obtener el primer día del mes y el número de días del mes
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Crear celdas vacías para los días antes del inicio del mes
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDayElement = document.createElement("div");
    calendarElement.appendChild(emptyDayElement);
  }

  // Crear celdas para cada día del mes
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "text-center py-2 border cursor-pointer";

    // Establece el texto del día
    dayElement.innerText = day;

    const date = new Date(year, month, day).toISOString().split("T")[0];

    // Buscar en recentData si la fecha existe
    const recommendation = recentData.find(item =>
      new Date(item.created_at).toISOString().split("T")[0] === date
    );

    if (recommendation) {
      dayElement.classList.add("bg-blue-500", "text-white");
      dayElement.addEventListener("click", () => {
        modal.value.beforeOpen(recommendation.id, recommendation.created_at);
      });
    } else {
      dayElement.classList.add("opacity-50", "cursor-not-allowed");
      dayElement.style.pointerEvents = "none"; // Evita clics en días sin recomendaciones
    }

    calendarElement.appendChild(dayElement);
  }
};

const processItemData = (items) => {
  const groupedByDate = {};
  items.forEach(item => {
    const date = new Date(item.created_at).toISOString().split("T")[0];
    if (!groupedByDate[date] || new Date(item.created_at) > new Date(groupedByDate[date].created_at)) {
      groupedByDate[date] = item;
    }
  });
  return Object.values(groupedByDate);
};



// Funciones para manejar el cambio de mes
const prevMonth = () => {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
  generateCalendar(currentYear.value, currentMonth.value);
};

const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
  generateCalendar(currentYear.value, currentMonth.value);
};

// Inicializar el calendario cuando el componente se monta
onMounted(() => {
  beforeOpen();
});
</script>


