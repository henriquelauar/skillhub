import api from './api';

export const getMatchesByUser = async (userId: number) => {
  const response = await api.get(`/matches/user/${userId}`);
  return response.data;
};

export const updateMatchStatus = async (matchId: string, status: 'ACEITO' | 'RECUSADO') => {
  const response = await api.put(`/matches/${matchId}/status`, { status });
  return response.data;
};

export const deleteMatch = async (matchId: string) => {
  await api.delete(`/matches/${matchId}`);
};

export const createMatch = async (senderId: number, receiverId: number, skillName: string) => {
    const response = await api.post(`/matches`, {
      senderId,
      receiverId,
      skillName,
    });
  
    return response.data;
  };