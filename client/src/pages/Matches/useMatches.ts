import { useEffect, useState } from 'react';
import { getMatchesByUser, updateMatchStatus, deleteMatch } from '../../services/matchService';

interface Match {
  id: string;
  status: string;
  sender: { id: number; name: string; email: string };
  receiver: { id: number; name: string; email: string };
  skill: { name: string };
}

const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [tab, setTab] = useState<'pendentes' | 'enviados' | 'recebidos' | 'aceitos'>('pendentes');

  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMatchesByUser(userId);
      setMatches(data);
    };

    fetchData();
  }, []);

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

  const filteredMatches = matches.filter(m => {
    if (tab === 'pendentes') return m.status === 'PENDENTE';
    if (tab === 'enviados') return m.status === 'PENDENTE' && m.sender.id === userId;
    if (tab === 'recebidos') return m.status === 'PENDENTE' && m.receiver.id === userId;
    if (tab === 'aceitos') return m.status === 'ACEITO';
    return false;
  });

  return {
    tab,
    setTab,
    userId,
    filteredMatches,
    handleAccept,
    handleReject,
    handleCancel,
  };
};

export default useMatches;
