import { FilterMatchMode } from '@primevue/core/api';

const columns = [
  {
    field: 'name',
    header: 'Nombre',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'description',
    header: 'Descripción',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'muscular_group_id',
    header: 'ID del Grupo Muscular',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'muscular_group_name',
    header: 'Nombre del Grupo Muscular',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'muscle_id',
    header: 'ID del Músculo',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'muscle_name',
    header: 'Nombre del Músculo',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
];

export { columns };
