import { FilterMatchMode } from '@primevue/core/api';

const columns = [
  {
    field: 'routine_exercise_id',
    header: 'ID de Ejercicio de Rutina',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'weight',
    header: 'Peso',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'sets',
    header: 'Series',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
];

export { columns };
