import api from './api';

export const getUserById = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post('/users', { name, email, password });
  return response.data;
};

export const getUser = (): { id: number; name: string; email: string } | null => {
  const userStr = localStorage.getItem('userId');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch (e) {
    console.error('Error parsing user from localStorage', e);
    return null;
  }
};