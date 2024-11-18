import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de usuarios
export const getUsers = async (params = {}) => {
  const response = await api.get('/users', { params });
  return response.data;
};

// Crear un nuevo usuario
export const createUser = async (data) => {
  const response = await api.post('/users', data);
  return response.data;
};

// Obtener un usuario específico por ID
export const getUserById = async (id, columns = ['id', 'name', 'email']) => {
  const response = await api.get(`/users/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar un usuario existente
export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
