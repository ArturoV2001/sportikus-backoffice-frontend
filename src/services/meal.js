import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de comidas
export const getMeals = async (params = {}) => {
  const response = await api.get('/meals', { params });
  return response.data;
};

// Crear una nueva comida
export const createMeal = async (data) => {
  const response = await api.post('/meals', data);
  return response.data;
};

// Obtener una comida específica por ID
export const getMealById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/meals/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar una comida existente
export const updateMeal = async (id, data) => {
  const response = await api.put(`/meals/${id}`, data);
  return response.data;
};

// Eliminar una comida
export const deleteMeal = async (id) => {
  const response = await api.delete(`/meals/${id}`);
  return response.data;
};
