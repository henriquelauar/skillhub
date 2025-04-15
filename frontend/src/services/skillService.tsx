import api from './api';

export const getOwnedSkills = async (userId: number) => {
  const response = await api.get(`/skills/owned/${userId}`);
  return response.data;
};

export const getSkillsToLearn = async (userId: number) => {
  const response = await api.get(`/skills/to-learn/${userId}`);
  return response.data;
};

export const addSkill = async (userId: number, name: string) => {
  return api.post('/skills', { userId, name });
};

export const updateSkill = async (id: number, userId: number, name: string) => {
  return api.put(`/skills/${id}`, { userId, name });
};

export const deleteSkill = async (id: number) => {
  return api.delete(`/skills/${id}`);
};
