import { useState, useEffect } from 'react';
import api from '../services/api';
import { SkillFormProps } from '../types';

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
        await api.put(`/skills/${skillToEdit.id}`, {
          name: skillName,
          userId: Number(userId),
        });
        setSuccess('Habilidade atualizada com sucesso!');
      } else {
        await api.post('/skills', {
          name: skillName,
          userId: Number(userId),
        });
        setSuccess('Habilidade adicionada com sucesso!');
      }

      setSkillName('');
      setError(null);
      onSkillAdded();
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
      <div className='input-group'>
        <input 
          type="text" 
          value={skillName} 
          onChange={(e) => setSkillName(e.target.value)} 
          placeholder="Nome da habilidade" 
          required 
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          {skillToEdit ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
      </form>
    </div>
  );
};

export default SkillForm;
