import { FilterMatchMode } from '@primevue/core/api';

const columns = [
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
    field: 'total_calories',
    header: 'Calorías Totales',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
];

export { columns };
