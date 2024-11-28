import { FilterMatchMode } from '@primevue/core/api';

const columns = [
  {
    field: 'id',
    header: 'ID',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'user_id',
    header: 'ID de Usuario',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'user_name',
    header: 'Nombre de Usuario',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'heart_frequency',
    header: 'Frecuencia Cardíaca',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'pressure',
    header: 'Presión',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'calories',
    header: 'Calorías',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'sleep_quality',
    header: 'Calidad del Sueño',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'sleep_minutes',
    header: 'Minutos de Sueño',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'steps',
    header: 'Pasos',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
];

export { columns };
