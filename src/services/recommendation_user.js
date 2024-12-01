import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

export const getRecommendationUsers = async (params = {}) => {
  const response = await api.get('/recommendation-user', { params });
  return response.data;
};

export const getRecommendation = async (params) => {
  const response = await api.get('/get-recommendation-user', { params });
  return response.data;
};
