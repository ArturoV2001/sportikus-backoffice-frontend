import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Función para obtener la lista de ailments-user
export const getAilmentsUser = async (params = {}) => {
  const response = await api.get('/ailments-user', { params });
  return response.data;
};

// Función para crear un nuevo ailment-user
export const createAilmentUser = async (data) => {
  const response = await api.post('/ailments-user', data);
  return response.data;
};

// Función para obtener los detalles de un ailment-user específico
export const getAilmentUser = async (id, columns = ['id', 'user_id', 'ailment_id']) => {
  const response = await api.get(`/ailments-user/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Función para actualizar un ailment-user
export const updateAilmentUser = async (id, data) => {
  const response = await api.put(`/ailments-user/${id}`, data);
  return response.data;
};

// Función para eliminar un ailment-user
export const deleteAilmentUser = async (id) => {
  const response = await api.delete(`/ailments-user/${id}`);
  return response.data;
};
