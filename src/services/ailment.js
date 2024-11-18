import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Agregar token si está disponible
  },
});

// Función para obtener la lista de ailments
export const getAilments = async (params = {}) => {
  const response = await api.get('/ailments', { params });
  return response.data;
};

// Función para crear un nuevo ailment
export const createAilment = async (data) => {
  const response = await api.post('/ailments', data);
  return response.data;
};

// Función para obtener los detalles de un ailment específico
export const getAilment = async (id, columns = ['id', 'email']) => {
  const response = await api.get(`/ailments/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Función para actualizar un ailment
export const updateAilment = async (id, data) => {
  const response = await api.put(`/ailments/${id}`, data);
  return response.data;
};

// Función para eliminar un ailment
export const deleteAilment = async (id) => {
  const response = await api.delete(`/ailments/${id}`);
  return response.data;
};
