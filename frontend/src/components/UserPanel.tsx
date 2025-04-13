import { useEffect, useState } from 'react';
import api from '../services/api';
import SkillForm from './SkillForm';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface Skill {
  id: number;
  name: string;
}

const UserPanel = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [skillsToLearn, setSkillsToLearn] = useState<Skill[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const fetchSkillsToLearn = async () => {
      const response = await api.get(`/skills/to-learn/${userId}`);
      setSkillsToLearn(response.data);
    };
  
    fetchSkillsToLearn();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('Usuário não está logado.');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data);
      } catch (err) {
        setError('Erro ao carregar dados do usuário');
        console.log(err);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await api.get(`/skills/user/${userId}`);
        setSkills(response.data);
      } catch (err) {
        setError('Erro ao carregar skills');
        console.log(err);
      }
    };

    fetchUserData();
    fetchSkills();
  }, []);

  const handleSkillAdded = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Recarregar a lista de habilidades
    api.get(`/skills/user/${userId}`)
      .then(response => setSkills(response.data))
      .catch(err => {
        setError('Erro ao atualizar a lista de skills');
        console.log(err);
      });
  };

  const handleDeleteSkill = async (skillId: number) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      await api.delete(`/skills/${skillId}`);
      setSkills(skills.filter(skill => skill.id !== skillId)); // Atualiza a lista local
    } catch (err) {
      setError('Erro ao excluir skill');
      console.log(err);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('userId');
    navigate('/login');
  }

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!userData) return <div className="alert alert-info">Carregando...</div>;

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '50px' }}>
      <div className="card p-4">
        <div style={{display: 'flex', alignItems: 'left'}}>
            <button onClick={handleLogout} className='btn btn-danger btn-sm mb-4'>
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
      <h3>Skills que deseja aprender</h3>
      <ul className="list-group mb-3">
        {skillsToLearn.length === 0 ? (
          <li className="list-group-item">Nenhuma habilidade adicionada.</li>
        ) : (
          skillsToLearn.map(skill => (
            <li className="list-group-item" key={skill.id}>{skill.name}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserPanel;
