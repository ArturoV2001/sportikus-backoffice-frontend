import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de mejores desempeños en ejercicios
export const getExerciseBestPerformances = async (params = {}) => {
  const response = await api.get('/exercises-best-performance', { params });
  return response.data;
};

// Crear un nuevo mejor desempeño para un ejercicio
export const createExerciseBestPerformance = async (data) => {
  const response = await api.post('/exercises-best-performance', data);
  return response.data;
};

// Obtener un mejor desempeño específico por ID
export const getExerciseBestPerformanceById = async (id, columns = ['id', 'exercise_id', 'user_id', 'performance']) => {
  const response = await api.get(`/exercises-best-performance/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar un mejor desempeño existente
export const updateExerciseBestPerformance = async (id, data) => {
  const response = await api.put(`/exercises-best-performance/${id}`, data);
  return response.data;
};

// Eliminar un mejor desempeño
export const deleteExerciseBestPerformance = async (id) => {
  const response = await api.delete(`/exercises-best-performance/${id}`);
  return response.data;
};
