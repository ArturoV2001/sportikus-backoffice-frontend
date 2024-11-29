import { FilterMatchMode } from '@primevue/core/api';

const columns = [
  {
    field: 'id',
    header: 'ID',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'email',
    header: 'Correo Electrónico',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'name',
    header: 'Nombre',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'last_name',
    header: 'Apellido',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'weight',
    header: 'Peso',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'birthdate',
    header: 'Fecha de Nacimiento',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
  {
    field: 'user_type_id',
    header: 'ID del Tipo de Usuario',
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: false,
  },
  {
    field: 'user_type_name',
    header: 'Tipo de Usuario',
    bodyTemplate: (data) => {
      return data.user_type_name === 'admin' ? 'Administrador' : 'Usuario';
    },
    filter: { value: null, matchMode: FilterMatchMode.CONTAINS },
    default: true,
  },
];

export { columns };
