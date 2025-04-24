import Layout from '../../components/layout/Layout';
import MatchTabs from './MatchTabs';
import UserMatchCard from '../../components/UserMatchCard';
import useMatches from './useMatches';

const MatchesPage = () => {
  const {
    tab,
    setTab,
    filteredMatches,
    userId,
    handleAccept,
    handleReject,
    handleCancel
  } = useMatches();

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
                isLearning={false}
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
