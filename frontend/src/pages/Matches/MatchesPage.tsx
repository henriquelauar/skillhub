import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import MatchTabs from './MatchesTabs';
import MatchCard from './MatchCard';
import { getMatchesByUser, updateMatchStatus, deleteMatch } from '../../services/matchService';

interface Match {
  id: string;
  status: string;
  sender: { id: number; name: string; email: string };
  receiver: { id: number; name: string; email: string };
  skill: { name: string };
}

const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [tab, setTab] = useState<'pendentes' | 'enviados' | 'recebidos' | 'aceitos'>('pendentes');
  const id = localStorage.getItem('userId');
  const userId = Number(id);

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
    if (tab === 'pendentes') return m.status === 'PENDENTE' && m.receiver.id === userId;
    if (tab === 'enviados') return m.status === 'PENDENTE' && m.sender.id === userId;
    if (tab === 'recebidos') return m.status === 'PENDENTE' && m.receiver.id === userId;
    if (tab === 'aceitos') return m.status === 'ACEITO';
    return false;
  });

  return (
    <Layout>
      <MatchTabs activeKey={tab} onSelectTab={setTab} />
      {filteredMatches.map(match => (
        <MatchCard
          key={match.id}
          name={match.sender.id === userId ? match.receiver.name : match.sender.name}
          email={match.sender.id === userId ? match.receiver.email : match.sender.email}
          skill={match.skill.name}
          status={
            match.status === 'ACEITO'
              ? 'aceito'
              : match.sender.id === userId
              ? 'enviado'
              : 'recebido'
          }
          onAccept={() => handleAccept(match.id)}
          onReject={() => handleReject(match.id)}
          onCancel={() => handleCancel(match.id)}
        />
      ))}
    </Layout>
  );
};

export default MatchesPage;
