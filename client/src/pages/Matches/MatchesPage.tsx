  import { useEffect, useState } from 'react';
  import Layout from '../../components/layout/Layout';
  import MatchTabs from './MatchesTabs';
  import UserMatchCard from '../../components/UserMatchCard';
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
      if (tab === 'pendentes') return m.status === 'PENDENTE';
      if (tab === 'enviados') return m.status === 'PENDENTE' && m.sender.id === userId;
      if (tab === 'recebidos') return m.status === 'PENDENTE' && m.receiver.id === userId;
      if (tab === 'aceitos') return m.status === 'ACEITO';
      return false;
    });

    return (
      <Layout title="Matches">
        <MatchTabs activeKey={tab} onSelectTab={setTab} />

        <div className="container mt-4">
          <div className="row">
            {filteredMatches.map(match => (
              <div key={match.id} className="col-md-6 col-lg-4 mb-4">
                <UserMatchCard
                  userId={match.sender.id === userId ? match.receiver.id : match.sender.id}
                  name={match.sender.id === userId ? match.receiver.name : match.sender.name}
                  email={match.sender.id === userId ? match.receiver.email : match.sender.email}
                  skillName={match.skill.name}
                  status={
                    match.status === 'ACEITO'
                      ? 'aceito'
                      : match.status === 'PENDENTE'
                        ? (match.sender.id === userId ? 'enviado' : 'recebido')
                        : 'pendente'
                  }
                  onAccept={() => handleAccept(match.id)}
                  onReject={() => handleReject(match.id)}
                  onCancel={() => handleCancel(match.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  };

  export default MatchesPage;
