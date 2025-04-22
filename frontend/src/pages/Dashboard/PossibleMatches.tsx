import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Match } from '../../types';

const PossibleMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    api.get(`/skills/matches/${userId}`).then((res) => {
      setMatches(res.data);
    });
  }, []);

  return (
    <div className="mt-5">
  <div className="card mb-4">
    <div className="card-header bg-gradient bg-opacity-10 d-flex justify-content-between align-items-center">
      <h2 className="h5 mb-0 text-info">
        <i className="bi bi-people me-2"></i>
        Possíveis Matches
      </h2>
      <a href="#" className="text-decoration-none small">
        Ver todos <i className="bi bi-chevron-right ms-1"></i>
      </a>
    </div>

    <div className="card-body">
      <div className="row g-4">
        {matches.flatMap((match) =>
          match.teachers.map((teacher) => (
            <div key={`${match.skillName}-${teacher.id}`} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacher.name)}`}
                      className="rounded-circle me-3"
                      width="48"
                      height="48"
                      alt={teacher.name}
                    />
                    <div>
                      <h6 className="mb-0">{teacher.name}</h6>
                      <p className="text-muted small mb-0">{teacher.email}</p>
                    </div>
                  </div>
                  <h6 className="mb-2">{match.skillName}</h6>
                  <p className="text-muted small mb-3">
                    Está disponível para te ajudar com <strong>{match.skillName}</strong>.
                  </p>
                  <button className="btn btn-outline-primary w-100">
                    Ver perfil
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        {matches.length === 0 && (
          <div className="col-12">
            <p className="text-muted">Nenhum match encontrado no momento.</p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default PossibleMatches;
