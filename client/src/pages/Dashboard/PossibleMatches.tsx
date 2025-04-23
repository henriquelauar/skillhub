import { useEffect, useMemo, useState } from 'react';
import api from '../../services/api';
import { Match, APIMatch } from '../../types';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import UserMatchCard from '../../components/UserMatchCard';
import { createMatch } from '../../services/matchService';
import { toast } from 'react-toastify';

const PossibleMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [existingMatches, setExistingMatches] = useState<{ receiverId: number; skillName: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const handleError = useErrorHandler();

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [skillsRes, existingRes] = await Promise.all([
          api.get(`/skills/matches/${userId}`),
          api.get(`/matches/user/${userId}`),
        ]);

        setMatches(skillsRes.data);

        const formattedExisting = existingRes.data.map((m: APIMatch) => ({
          receiverId: m.receiverId,
          skillName: m.skill.name,
        }));
        setExistingMatches(formattedExisting);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [handleError]);

  const isAlreadyMatched = (receiverId: number, skillName: string) =>
    existingMatches.some(
      (m) =>
        m.receiverId === receiverId &&
        m.skillName?.toLowerCase() === skillName.toLowerCase()
    );

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
              isMatched={isAlreadyMatched(teacher.id, match.skillName)}
              onMatch={async () => {
                try {
                  const userId = Number(localStorage.getItem("userId"));
                  await createMatch(userId, teacher.id, match.skillName);
                  toast.success("Match enviado com sucesso!");

                  setExistingMatches((prev) => [
                    ...prev,
                    { receiverId: teacher.id, skillName: match.skillName },
                  ]);
                } catch (err) {
                  toast.error("Erro ao enviar o match.");
                  handleError(err);
                }
              }}
            />
          </div>
        ))
    );
  }, [matches, existingMatches]);

  return (
    <div className="mt-5">
      <div className="card mb-4">
        <div className="card-header bg-gradient bg-opacity-10 d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0 text-info">
            <i className="bi bi-people me-2"></i>
            Possíveis Matches
          </h2>
          <a href="/explore" className="text-decoration-none small">
            Ver todos <i className="bi bi-chevron-right ms-1"></i>
          </a>
        </div>
        <div className="card-body">
          {loading ? (
            <p className="text-muted">Carregando possíveis matches...</p>
          ) : filteredCards.length > 0 ? (
            <div className="row g-4">{filteredCards}</div>
          ) : (
            <p className="text-muted">Nenhum match encontrado no momento.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PossibleMatches;
