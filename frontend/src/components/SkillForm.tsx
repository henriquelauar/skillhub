import { useState, useEffect } from 'react';
import api from '../services/api';

interface Skill {
  id: number;
  name: string;
}

interface SkillFormProps {
  skillToEdit?: Skill;
  onSkillAdded: () => void;
}

const SkillForm = ({ skillToEdit, onSkillAdded }: SkillFormProps) => {
  const [skillName, setSkillName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (skillToEdit) {
      setSkillName(skillToEdit.name);
    }
  }, [skillToEdit]);

  const handleAddOrUpdateSkill = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      setError('Usuário não autenticado');
      return;
    }

    try {
      if (skillToEdit) {
        // Atualizando a skill existente
        await api.put(`/skills/${skillToEdit.id}`, {
          name: skillName,
          userId: Number(userId),
        });
        setSuccess('Habilidade atualizada com sucesso!');
      } else {
        // Adicionando nova skill
        await api.post('/skills', {
          name: skillName,
          userId: Number(userId),
        });
        setSuccess('Habilidade adicionada com sucesso!');
      }

      setSkillName('');
      setError(null);
      onSkillAdded();  // Atualiza a lista de skills
    } catch (err) {
      setError('Erro ao adicionar/atualizar skill');
      setSuccess(null);
      console.log(err);
    }
  };

  return (
    <div>
      <h3>{skillToEdit ? 'Editar Habilidade' : 'Adicionar Habilidade'}</h3>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <form onSubmit={handleAddOrUpdateSkill}>
        <input 
          type="text" 
          value={skillName} 
          onChange={(e) => setSkillName(e.target.value)} 
          placeholder="Nome da habilidade" 
          required 
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">
          {skillToEdit ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
    </div>
  );
};

export default SkillForm;
