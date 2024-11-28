import { FilterMatchMode } from '@primevue/core/api';

const columns = [
  {
    field: 'id',
    header: 'ID',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'name',
    header: 'Nombre',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'description',
    header: 'Descripción',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'cronic',
    header: 'Crónico',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    bodyTemplate: (data) => {
      return data.cronic === 0 ? 'No' : 'Si';
    },
    default: true,
  },
];

export { columns };
