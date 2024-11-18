import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de Muscles
export const getMuscles = async (params = {}) => {
  const response = await api.get('/muscles', { params });
  return response.data;
};

// Crear un nuevo Muscle
export const createMuscle = async (data) => {
  const response = await api.post('/muscles', data);
  return response.data;
};

// Obtener un Muscle específico por ID
export const getMuscleById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/muscles/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar un Muscle existente
export const updateMuscle = async (id, data) => {
  const response = await api.put(`/muscles/${id}`, data);
  return response.data;
};

// Eliminar un Muscle
export const deleteMuscle = async (id) => {
  const response = await api.delete(`/muscles/${id}`);
  return response.data;
};
