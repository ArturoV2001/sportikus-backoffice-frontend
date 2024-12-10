<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Bienvenida -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-indigo-900">¡Bienvenido a Sportikus, {{ user.name }}!</h1>
      <p class="text-gray-600 mt-2">
        En Sportikus, te ayudamos a alcanzar tus objetivos de hipertrofia con rutinas personalizadas y monitoreo de tus datos biométricos.
      </p>
    </div>

    <!-- Contenedor de gráficas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Gráfica de usuarios registrados por mes -->
      <div class="card bg-white p-6 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Usuarios registrados por mes</h2>
        <Chart type="bar" :data="chartDataUsers" :options="chartOptionsUsers" class="h-[20rem]" />
      </div>

      <!-- Gráfica de promedio de datos biométricos -->
      <div class="card bg-white p-6 shadow-md rounded-lg">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Promedio de datos biométricos (últimos 7 días)</h2>
        <Chart type="doughnut" :data="chartDataBiometrics" :options="chartOptionsBiometrics" class="h-[20rem]" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import Chart from 'primevue/chart';

const user = inject('user');

const chartDataUsers = ref();
const chartOptionsUsers = ref();
const chartDataBiometrics = ref();
const chartOptionsBiometrics = ref();

onMounted(() => {
  chartDataUsers.value = setChartDataUsers();
  chartOptionsUsers.value = setChartOptionsUsers();
  chartDataBiometrics.value = setChartDataBiometrics();
  chartOptionsBiometrics.value = setChartOptionsBiometrics();
});

// Datos ficticios para usuarios registrados por mes
const setChartDataUsers = () => {
  return {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    datasets: [
      {
        label: "Usuarios Registrados",
        backgroundColor: "#4F46E5",
        hoverBackgroundColor: "#4338CA",
        data: [20, 45, 35, 60, 80, 100, 120],
      },
    ],
  };
};

const setChartOptionsUsers = () => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#6B7280",
        },
      },
      y: {
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#6B7280",
        },
      },
    },
  };
};

// Datos ficticios para promedio de datos biométricos
const setChartDataBiometrics = () => {
  return {
    labels: [
      "Frecuencia cardíaca",
      "Oxigenación",
      "Pasos",
      "Distancia (km)",
      "Calidad de sueño",
    ],
    datasets: [
      {
        data: [72, 98, 8000, 5.4, 85],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"],
        hoverBackgroundColor: [
          "#4338CA",
          "#059669",
          "#D97706",
          "#DC2626",
          "#2563EB",
        ],
      },
    ],
  };
};

const setChartOptionsBiometrics = () => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
        },
      },
    },
  };
};
</script>

<style scoped>
.card {
  border-radius: 0.5rem;
}
</style>
