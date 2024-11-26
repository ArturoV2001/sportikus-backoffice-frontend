import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authLogin = async (data) => {
  const response = await api.post('/login', {
    ...data,
    grant_type:"password",
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret:import.meta.env.VITE_CLIENT_SECRET
  });
  return response.data;
}

export const authRegister = async (data) => {
  const response = await api.post('/register',data);
  return response.data;
}


export const authLogout = async () => {
  const response = await axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth')}`,
    },
  }).get('/logout',{});
  return response.data;
}

export const authCheckSession = async () => {
  const response = await axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth')}`,
    },
  }).get('/check-session');
  return response.data;
}

