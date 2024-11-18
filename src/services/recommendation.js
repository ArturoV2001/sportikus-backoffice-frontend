import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de Recomendaciones
export const getRecommendations = async (params = {}) => {
  const response = await api.get('/recommendation', { params });
  return response.data;
};

// Crear una nueva Recomendación
export const createRecommendation = async (data) => {
  const response = await api.post('/recommendation', data);
  return response.data;
};

// Obtener una Recomendación específica por ID
export const getRecommendationById = async (id, columns = ['id', 'title', 'description']) => {
  const response = await api.get(`/recommendation/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar una Recomendación existente
export const updateRecommendation = async (id, data) => {
  const response = await api.put(`/recommendation/${id}`, data);
  return response.data;
};

// Eliminar una Recomendación
export const deleteRecommendation = async (id) => {
  const response = await api.delete(`/recommendation/${id}`);
  return response.data;
};
