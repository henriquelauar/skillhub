import { useEffect, useMemo, useState } from 'react';
import { Match } from '../../types';
import UserMatchCard from '../../components/UserMatchCard';
import { useMatchActions } from '../../hooks/useMatchActions';
import { Link } from 'react-router-dom';
import { getMatchesById } from '../../services/skillService';

const PossibleMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = Number(localStorage.getItem('userId'));
  const { mySkills, sendMatch, isAlreadyMatched } = useMatchActions(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMatchesById(userId);
        setMatches(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const filteredCards = useMemo(() => {
    return matches.flatMap((match) =>
      match.teachers
        .filter((teacher) => !isAlreadyMatched(teacher.id, match.skillName))
        .map((teacher) => (
          <div key={`${match.skillName}-${teacher.id}`} className="col-12 col-md-6 col-lg-4">
            <UserMatchCard
              userId={teacher.id}
              name={teacher.name}
              email={teacher.email}
              skillName={match.skillName}
              isLearning={false}
              isMatched={isAlreadyMatched(teacher.id, match.skillName)}
              onMatch={() => sendMatch(teacher.id, match.skillName)}
              mySkills={mySkills}
            />
          </div>
        ))
    );
  }, [matches, isAlreadyMatched]);

  return (
    <div className="mt-5">
      <div className="card mb-4">
        <div className="card-header bg-gradient bg-opacity-10 d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0 text-info">
            <i className="bi bi-people me-2"></i>
            Possíveis Matches
          </h2>
          <Link to="/search" className="text-decoration-none small">
            Ver todos <i className="bi bi-chevron-right ms-1"></i>
          </Link>
        </div>
        <div className="card-body">
          {loading ? (
            <p className="text-muted">Carregando possíveis matches...</p>
          ) : filteredCards.length > 0 ? (
            <div className="row g-4">{filteredCards.slice(0,6)}</div>
          ) : (
            <p className="text-muted">Nenhum match encontrado no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PossibleMatches;