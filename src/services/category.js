import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de categorías
export const getCategories = async (params = {}) => {
  const response = await api.get('/categories', { params });
  return response.data;
};

// Crear una nueva categoría
export const createCategory = async (data) => {
  const response = await api.post('/categories', data);
  return response.data;
};

// Obtener una categoría específica por ID
export const getCategoryById = async (id, columns = ['id', 'name', 'description']) => {
  const response = await api.get(`/categories/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar una categoría existente
export const updateCategory = async (id, data) => {
  const response = await api.put(`/categories/${id}`, data);
  return response.data;
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
