import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de Muscular Groups
export const getMuscularGroups = async (params = {}) => {
  const response = await api.get('/muscular-groups', { params });
  return response.data;
};

// Crear un nuevo Muscular Group
export const createMuscularGroup = async (data) => {
  const response = await api.post('/muscular-groups', data);
  return response.data;
};

// Obtener un Muscular Group específico por ID
export const getMuscularGroupById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/muscular-groups/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar un Muscular Group existente
export const updateMuscularGroup = async (id, data) => {
  const response = await api.put(`/muscular-groups/${id}`, data);
  return response.data;
};

// Eliminar un Muscular Group
export const deleteMuscularGroup = async (id) => {
  const response = await api.delete(`/muscular-groups/${id}`);
  return response.data;
};
