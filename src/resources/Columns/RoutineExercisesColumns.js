import { FilterMatchMode } from '@primevue/core/api';

const columns = [
  {
    field: 'id',
    header: 'ID',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'repetitions',
    header: 'Repeticiones',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'sets',
    header: 'Series',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'routine_id',
    header: 'ID de Rutina',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'routine_name',
    header: 'Nombre de Rutina',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'exercise_id',
    header: 'ID de Ejercicio',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'exercise_name',
    header: 'Nombre de Ejercicio',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'day',
    header: 'Día',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
];

export { columns };
