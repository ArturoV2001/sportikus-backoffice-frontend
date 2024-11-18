import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de alimentos
export const getFoods = async (params = {}) => {
  const response = await api.get('/foods', { params });
  return response.data;
};

// Crear un nuevo alimento
export const createFood = async (data) => {
  const response = await api.post('/foods', data);
  return response.data;
};

// Obtener un alimento específico por ID
export const getFoodById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/foods/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar un alimento existente
export const updateFood = async (id, data) => {
  const response = await api.put(`/foods/${id}`, data);
  return response.data;
};

// Eliminar un alimento
export const deleteFood = async (id) => {
  const response = await api.delete(`/foods/${id}`);
  return response.data;
};
