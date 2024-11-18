import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Función para obtener la lista de datos biométricos
export const getBiometricData = async (params = {}) => {
  const response = await api.get('/biometric-data', { params });
  return response.data;
};

// Función para crear un nuevo dato biométrico
export const createBiometricData = async (data) => {
  const response = await api.post('/biometric-data', data);
  return response.data;
};

// Función para obtener los detalles de un dato biométrico específico
export const getBiometricDataById = async (id, columns = ['id', 'user_id', 'data_type', 'value']) => {
  const response = await api.get(`/biometric-data/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Función para actualizar un dato biométrico
export const updateBiometricData = async (id, data) => {
  const response = await api.put(`/biometric-data/${id}`, data);
  return response.data;
};

// Función para eliminar un dato biométrico
export const deleteBiometricData = async (id) => {
  const response = await api.delete(`/biometric-data/${id}`);
  return response.data;
};
