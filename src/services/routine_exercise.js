import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de ejercicios de rutina
export const getRoutineExercises = async (params = {}) => {
  const response = await api.get('/routine-exercises', { params });
  return response.data;
};

// Crear un nuevo ejercicio de rutina
export const createRoutineExercise = async (data) => {
  const response = await api.post('/routine-exercises', data);
  return response.data;
};

// Obtener un ejercicio de rutina específico por ID
export const getRoutineExerciseById = async (id, columns = ['id', 'name', 'routine_id']) => {
  const response = await api.get(`/routine-exercises/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar un ejercicio de rutina existente
export const updateRoutineExercise = async (id, data) => {
  const response = await api.put(`/routine-exercises/${id}`, data);
  return response.data;
};

// Eliminar un ejercicio de rutina
export const deleteRoutineExercise = async (id) => {
  const response = await api.delete(`/routine-exercises/${id}`);
  return response.data;
};
