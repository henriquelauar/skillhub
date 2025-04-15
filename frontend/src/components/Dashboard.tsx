import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../services/userService';
import { getOwnedSkills, getSkillsToLearn, deleteSkill } from '../services/skillService';
import { Skill, UserData } from '../types';
import { getUserId, logout } from '../utils/auth';
import SkillForm from './SkillForm';

const Dashboard = () => {
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
        const [user, owned, toLearn] = await Promise.all([
          getUserById(userId),
          getOwnedSkills(userId),
          getSkillsToLearn(userId),
        ]);
        setUserData(user);
        setSkills(owned);
        setSkillsToLearn(toLearn);
      } catch (err) {
        setError('Erro ao carregar dados');
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);

  const handleSkillAdded = async () => {
    if (!userId) return;
    try {
      const [owned, toLearn] = await Promise.all([
        getOwnedSkills(userId),
        getSkillsToLearn(userId),
      ]);
      setSkills(owned);
      setSkillsToLearn(toLearn);
    } catch (err) {
      setError('Erro ao atualizar listas');
      console.error(err);
    }
  };

  const handleDeleteSkill = async (skillId: number) => {
    try {
      await deleteSkill(skillId);
      setSkills(prev => prev.filter(skill => skill.id !== skillId));
      setSkillsToLearn(prev => prev.filter(skill => skill.id !== skillId));
    } catch (err) {
      setError('Erro ao excluir skill');
      console.log(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!userData) return <div className="alert alert-info">Carregando...</div>;

  return (
    <div className="container mt-5">
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h3>Bem-vindo, {userData.name}</h3>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
      </div>

      <SkillForm onSkillAdded={handleSkillAdded} />

      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Habilidades que Quero Ensinar</h4>
          {skills.length === 0 ? (
            <p>Nenhuma habilidade cadastrada.</p>
          ) : (
            <ul className="list-group">
              {skills.map(skill => (
                <li key={skill.id} className="list-group-item d-flex justify-content-between">
                  {skill.name}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteSkill(skill.id)}>Excluir</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-6">
          <h4>Habilidades que Quero Aprender</h4>
          {skillsToLearn.length === 0 ? (
            <p>Nenhuma habilidade cadastrada.</p>
          ) : (
            <ul className="list-group">
              {skillsToLearn.map(skill => (
                <li key={skill.id} className="list-group-item d-flex justify-content-between">
                  {skill.name}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteSkill(skill.id)}>Excluir</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
