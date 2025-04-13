/* eslint-disable @typescript-eslint/no-unused-vars */
// WantToLearnForm.tsx
import { useState } from 'react';
import api from '../services/api';

const WantToLearnForm = () => {
  const [skillName, setSkillName] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) return setError('Usuário não autenticado');

    try {
      await api.post('/skills/to-learn', {
        name: skillName,
        userId: Number(userId),
      });
      setSkillName('');
      setSuccess('Skill adicionada com sucesso!');
      setError(null);
    } catch (err) {
      setError('Erro ao adicionar skill');
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleAdd} className="mb-3">
      <div className="input-group">
        <input
          className="form-control"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          placeholder="Habilidade que deseja aprender"
          required
        />
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </div>
      {error && <div className="text-danger">{error}</div>}
      {success && <div className="text-success">{success}</div>}
    </form>
  );
};

export default WantToLearnForm;
