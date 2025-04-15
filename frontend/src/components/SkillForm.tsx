import { useState } from 'react';
import api from '../services/api';
import { SkillFormProps } from '../types';

const SkillForm = ({ onSkillAdded }: SkillFormProps) => {
  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState('queroEnsinar');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) return setMessage({ type: 'error', text: 'Usuário não autenticado' });

    try {
      if (skillType === 'queroEnsinar') {
        await api.post('/skills', {
          name: skillName,
          userId: Number(userId),
        });
      } else {
        await api.post(`/skills/to-learn/${userId}`, {
          name: skillName,
          userId: Number(userId),
        });
      }
      setSkillName('');
      setMessage({ type: 'success', text: 'Habilidade adicionada com sucesso!' });
      onSkillAdded();
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro ao adicionar habilidade' });
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2 align-items-center">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Nome da habilidade"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select shadow-sm"
            value={skillType}
            onChange={(e) => setSkillType(e.target.value)}
          >
            <option value="domino">Quero ensinar</option>
            <option value="aprender">Quero aprender</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100 shadow-sm">
            Adicionar
          </button>
        </div>
      </div>
      
      {message && (
        <div className={`mt-3 fw-medium text-${message.type === 'success' ? 'success' : 'danger'}`}>
          {message.text}
        </div>
      )}
    </form>
  );
  
};

export default SkillForm;
