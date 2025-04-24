import { useEffect, useState } from 'react';
import { getMatchesByUser, updateMatchStatus, deleteMatch } from '../services/matchService';

export interface Match {
  id: string;
  status: string;
  sender: { id: number; name: string; email: string };
  receiver: { id: number; name: string; email: string };
  skill: { name: string };
}

const useMatches = (options?: { autoFetch?: boolean }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    if (options?.autoFetch !== false) fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const data = await getMatchesByUser(userId);
    setMatches(data);
  };

  const handleAccept = async (matchId: string) => {
    await updateMatchStatus(matchId, 'ACEITO');
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status: 'ACEITO' } : m));
  };

  const handleReject = async (matchId: string) => {
    await updateMatchStatus(matchId, 'RECUSADO');
    setMatches(prev => prev.filter(m => m.id !== matchId));
  };

  const handleCancel = async (matchId: string) => {
    await deleteMatch(matchId);
    setMatches(prev => prev.filter(m => m.id !== matchId));
  };

  const getFilteredMatches = (filter: 'pendentes' | 'enviados' | 'recebidos' | 'aceitos') => {
    return matches.filter(m => {
      if (filter === 'pendentes') return m.status === 'PENDENTE';
      if (filter === 'enviados') return m.status === 'PENDENTE' && m.sender.id === userId;
      if (filter === 'recebidos') return m.status === 'PENDENTE' && m.receiver.id === userId;
      if (filter === 'aceitos') return m.status === 'ACEITO';
      return false;
    });
  };

  return {
    matches,
    fetchMatches,
    getFilteredMatches,
    userId,
    handleAccept,
    handleReject,
    handleCancel,
  };
};

export default useMatches;
