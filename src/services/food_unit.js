import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de unidades de alimentos
export const getFoodUnits = async (params = {}) => {
  const response = await api.get('/food-units', { params });
  return response.data;
};

// Crear una nueva unidad de alimento
export const createFoodUnit = async (data) => {
  const response = await api.post('/food-units', data);
  return response.data;
};

// Obtener una unidad de alimento específica por ID
export const getFoodUnitById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/food-units/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar una unidad de alimento existente
export const updateFoodUnit = async (id, data) => {
  const response = await api.put(`/food-units/${id}`, data);
  return response.data;
};

// Eliminar una unidad de alimento
export const deleteFoodUnit = async (id) => {
  const response = await api.delete(`/food-units/${id}`);
  return response.data;
};
