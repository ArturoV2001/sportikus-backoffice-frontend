import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de Rutinas
export const getRoutines = async (params = {}) => {
  const response = await api.get('/routines', { params });
  return response.data;
};

// Crear una nueva Rutina
export const createRoutine = async (data) => {
  const response = await api.post('/routines', data);
  return response.data;
};

// Obtener una Rutina específica por ID
export const getRoutineById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/routines/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar una Rutina existente
export const updateRoutine = async (id, data) => {
  const response = await api.put(`/routines/${id}`, data);
  return response.data;
};

// Eliminar una Rutina
export const deleteRoutine = async (id) => {
  const response = await api.delete(`/routines/${id}`);
  return response.data;
};
