import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../services/userService';
import { getUserSkills, getSkillsToLearn, deleteSkill } from '../services/skillService';
import { Skill, UserData } from '../types';
import { getUserId, logout } from '../utils/auth';
import SkillForm from '../components/SkillForm';

const UserPanel = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsToLearn, setSkillsToLearn] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      setError('Usuário não está logado.');
      return;
    }

    const fetchData = async () => {
      try {
        const [user, userSkills, skillsToLearn] = await Promise.all([
          getUserById(userId),
          getUserSkills(userId),
          getSkillsToLearn(userId),
        ]);
        setUserData(user);
        setSkills(userSkills);
        setSkillsToLearn(skillsToLearn);
      } catch (err) {
        setError('Erro ao carregar dados do usuário');
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  const handleSkillAdded = async () => {
    if (!userId) return;
    try {
      const updatedSkills = await getUserSkills(userId);
      setSkills(updatedSkills);
    } catch (err) {
      setError('Erro ao atualizar a lista de skills');
      console.error(err);
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    if (!userId) return;
    try {
      await deleteSkill(skillId);
      setSkills(skills.filter(skill => skill.id !== skillId));
    } catch (err) {
      setError('Erro ao excluir skill');
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!userData) return <div className="alert alert-info">Carregando...</div>;

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '50px' }}>
      <div className="card p-4">
        <div>
          <button onClick={handleLogout} className="btn btn-danger btn-sm mb-4">
            Logout
          </button>
        </div>
        <h2 className="text-center mb-4">Bem-vindo, {userData.name}!</h2>
        <SkillForm onSkillAdded={handleSkillAdded} />
        <h3 className="mt-4">Suas Skills</h3>
        {skills.length === 0 ? (
          <p>Nenhuma skill cadastrada.</p>
        ) : (
          <ul className="list-group">
            {skills.map(skill => (
              <li key={skill.id} className="list-group-item d-flex justify-content-between align-items-center">
                {skill.name}
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSkill(skill.id)}>
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="mt-4">Skills que deseja aprender</h3>
      <ul className="list-group mb-3">
        {skillsToLearn.length === 0 ? (
          <li className="list-group-item">Nenhuma habilidade adicionada.</li>
        ) : (
          skillsToLearn.map(skill => (
            <li className="list-group-item" key={skill.id}>
              {skill.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserPanel;