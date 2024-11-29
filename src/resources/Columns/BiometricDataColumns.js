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
    field: 'created_at',
    header: 'Fecha',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'heart_frequency',
    header: 'Frecuencia Cardíaca',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'steps',
    header: 'Pasos',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'distance',
    header: 'Distancia',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'oxygenation',
    header: 'Saturación de Oxígeno',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'sleep_quantity',
    header: 'Cantidad de Sueño',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'sleep_quality_awake',
    header: 'Calidad del Sueño: Tiempo Despierto',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'sleep_quality_rem',
    header: 'Calidad del Sueño: Fase REM',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'sleep_quality_core',
    header: 'Calidad del Sueño: Fase Ligera',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'sleep_quality_deep',
    header: 'Calidad del Sueño: Fase Profunda',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
];

export { columns };
