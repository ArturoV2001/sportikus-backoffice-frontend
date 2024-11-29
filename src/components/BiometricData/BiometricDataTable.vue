<template>
  <div class="w-full">
    <!-- Encabezado y Botones -->
    <div class="w-full flex items-center justify-between mr-2 mb-4 pt-4">
      <!-- Encabezado -->
      <h1 class="text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white mr-2">
        Mis Registros Biometricos
      </h1>
      <!-- Botones -->
      <div class="flex">
        <button
          @click="restartFilters"
          class="inline-flex items-center text-white bg-[#4ADBE5] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center" >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span class="text-md">Restablecer filtros</span>
        </button>
        <button
          @click="modal.beforeOpen()"
          class="ml-4 inline-flex items-center text-white bg-[#16313C] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 mr-2">
            <path
              stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span class="text-md">Añadir un Medición</span>
        </button>
      </div>
    </div>
    <!-- Tabla de datos -->
    <div class="card">
      <DataTable
        scrollable :value="items" filterDisplay="row" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
        :loading="loading" class="border border-gray-300">
        <template v-for="item in defaultColumns">
          <Column
            v-if="item.default" :field="item.bodyTemplate ? item.bodyTemplate : item.field" :header="item.header"
            header-style="background-color:#16313C; color: #ffffff;" :style="item.bodyClass ? item.bodyClass : 'width: auto'" :key="item.field">
            <template #filter>
              <InputText
                v-model="item.filter.value" type="text" placeholder=""
                @valueChange="filterColumn(item.field, item.filter.value)"
              />
            </template>
          </Column>
        </template>
      </DataTable>
    </div>
  </div>
  <BiometricDataModal ref="modal" @elementCreated="restartFilters"/>
</template>


<script setup>
import InputText from 'primevue/inputtext'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { getBiometricData } from '@/services/biometric_data.js';
import { columns } from '@/resources/Columns/BiometricDataColumns.js';
import debounce from 'lodash/debounce';
import BiometricDataModal from '@/components/BiometricData/BiometricDataModal.vue'

const modal = ref(null);
const defaultColumns = ref([]);
const items = ref([]);
const loading = ref(true);
const filters = ref({});

const beforeOpen = async () => {
  defaultColumns.value = columns;
  await restartFilters();
};

const chargeData = async () => {
  loading.value = true;
  await getBiometricData({
    columns: JSON.stringify(defaultColumns.value.map(i => i.field)),
    filters: JSON.stringify(filters.value),
  })
    .then(response => {
      items.value = response.data;
      loading.value = false;
    });
}
const restartFilters = () => {
  filters.value = {}
  defaultColumns.value.map(i => i.filter.value = "");
  chargeData();
}
const filterColumn = debounce((field, val) => {
  console.log(val)
  if (val !== "") {
    filters.value[field] = {value: `%${val}%`, matchMode: 'contains' };
    console.log(filters.value);
  }else {
    delete filters.value[field];
    console.log(filters.value);
  }
  chargeData();
}, 1200);

onMounted(() => {
  beforeOpen();
});
</script>

<style scoped>
.card {
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
