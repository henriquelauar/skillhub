// src/components/Dashboard.tsx
import SkillForm from './SkillForm';
import EditSkillModal from './EditSkillModal';
import { useDashboard } from './useDashboard';

const Dashboard = () => {
  const {
    userData,
    error,
    skills,
    skillsToLearn,
    isModalOpen,
    editingSkill,
    setIsModalOpen,
    setEditingSkill,
    handleLogout,
    handleDeleteSkill,
    handleSkillAdded,
  } = useDashboard();

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!userData) return <div className="alert alert-info">Carregando...</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Bem-vindo, {userData.name}</h3>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
      </div>

      <SkillForm onSkillAdded={handleSkillAdded} />

      {isModalOpen && (
        <EditSkillModal
          skill={editingSkill}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleSkillAdded}
        />
      )}

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card-dark mb-4">
            <h4>Habilidades que Quero Ensinar</h4>
            {skills.length === 0 ? (
              <p>Nenhuma habilidade cadastrada.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {skills.map(skill => (
                  <li key={skill.id} className="list-group-item bg-transparent text-white d-flex justify-content-between align-items-center border-0">
                    {skill.name}
                    <div>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => { setEditingSkill(skill); setIsModalOpen(true); }}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSkill(skill.id)}>Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-dark mb-4">
            <h4>Habilidades que Quero Aprender</h4>
            {skillsToLearn.length === 0 ? (
              <p>Nenhuma habilidade cadastrada.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {skillsToLearn.map(skill => (
                  <li key={skill.id} className="list-group-item bg-transparent text-white d-flex justify-content-between align-items-center border-0">
                    {skill.name}
                    <div>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => { setEditingSkill(skill); setIsModalOpen(true); }}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSkill(skill.id)}>Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
