<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-between mr-2 mb-4 pt-4">
      <h1 class="text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white mr-2">
        Mis Registros Biometricos
      </h1>
      <div class="flex">
        <button
          @click="restartFilters"
          class="inline-flex items-center text-white bg-[#4ADBE5] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center" >
          <i class="pi pi-sync mr-2"/>
          <span class="text-md">Restablecer filtros</span>
        </button>
        <button
          @click="modal.beforeOpen()"
          class="ml-4 inline-flex items-center text-white bg-[#16313C] focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center">
          <i class="pi pi-gauge mr-2"/>
          <span class="text-md">Añadir un Medición</span>
        </button>
      </div>
    </div>
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
import { inject } from 'vue'

const user = inject('user');
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
  filters.value['user_id'] = {value: user.id, matchMode: 'contains' };
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
