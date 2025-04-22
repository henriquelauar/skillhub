import { useEffect, useState } from 'react';
import { getPopularSkills } from '../../services/skillService';
import { PopularSkills } from '../../types';

const PopularSkillsSection = () => {
  const [skills, setSkills] = useState<PopularSkills[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getPopularSkills();
        const top5 = data
          .sort((a: PopularSkills, b: PopularSkills) => b.count - a.count)
          .slice(0, 5);
        setSkills(top5);
      } catch (err) {
        console.error('Erro ao carregar habilidades populares:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="mt-5">
      <div className="card">
        <div className="card-header bg-gradient bg-opacity-10 d-flex justify-content-between align-items-center">
          <h2 className="h5 mb-0 text-warning">
            <i className="bi bi-stars me-2"></i>
            Habilidades Populares
          </h2>
        </div>

        <div className="card-body">
          {loading ? (
            <p className="text-muted">Carregando...</p>
          ) : (
            <div className="row g-4">
              {skills.map((skill, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border">
                    <div className="card-body">
                      <h6 className="mb-2 fw-bold">{skill.name}</h6>
                      <p className="text-muted small mb-0">
                        {skill.count} usuários{' '}
                        {skill.type === 'domino' ? 'ensinando' : 'aprendendo'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularSkillsSection;
