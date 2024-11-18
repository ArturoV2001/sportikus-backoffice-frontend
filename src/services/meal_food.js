import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('auth')}`, // Token si está disponible
  },
});

// Obtener la lista de MealFoods
export const getMealFoods = async (params = {}) => {
  const response = await api.get('/meal-foods', { params });
  return response.data;
};

// Crear una nueva relación MealFood
export const createMealFood = async (data) => {
  const response = await api.post('/meal-foods', data);
  return response.data;
};

// Obtener una relación MealFood específica por ID
export const getMealFoodById = async (id, columns = ['id', 'meal_id', 'food_id', 'quantity']) => {
  const response = await api.get(`/meal-foods/${id}`, {
    params: { columns: JSON.stringify(columns) },
  });
  return response.data;
};

// Actualizar una relación MealFood existente
export const updateMealFood = async (id, data) => {
  const response = await api.put(`/meal-foods/${id}`, data);
  return response.data;
};

// Eliminar una relación MealFood
export const deleteMealFood = async (id) => {
  const response = await api.delete(`/meal-foods/${id}`);
  return response.data;
};
