import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de ejercicios
export const getExercises = async (params = {}) => {
  const response = await api.get('/exercises', { params });
  return response.data;
};

// Crear un nuevo ejercicio
export const createExercise = async (data) => {
  const response = await api.post('/exercises', data);
  return response.data;
};

// Obtener un ejercicio específico por ID
export const getExerciseById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/exercises/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar un ejercicio existente
export const updateExercise = async (id, data) => {
  const response = await api.put(`/exercises/${id}`, data);
  return response.data;
};

// Eliminar un ejercicio
export const deleteExercise = async (id) => {
  const response = await api.delete(`/exercises/${id}`);
  return response.data;
};
