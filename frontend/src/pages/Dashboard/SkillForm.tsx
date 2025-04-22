import { useState } from 'react';
import api from '../../services/api';
import { SkillFormProps } from '../../types';

const SkillForm = ({ onSkillAdded }: SkillFormProps) => {
  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState('domino');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) return setMessage({ type: 'error', text: 'Usuário não autenticado' });

    try {
      const data = {
        name: skillName,
        userId: Number(userId),
        details,
      };

      if (skillType === 'domino') {
        await api.post('/skills', data);
      } else {
        await api.post(`/skills/to-learn/${userId}`, data);
      }

      setSkillName('');
      setDetails('');
      setMessage({ type: 'success', text: 'Habilidade adicionada com sucesso!' });
      onSkillAdded();
    } catch (err) {
      setMessage({ type: 'error', text: 'Erro ao adicionar habilidade' });
      console.error(err);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Adicionar Habilidade</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="skill-name" className="form-label">Nome da habilidade</label>
            <input
              type="text"
              className="form-control"
              id="skill-name"
              placeholder="Ex: Programação em Python"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo de habilidade</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="skillType"
                id="teach-skill"
                value="domino"
                checked={skillType === 'domino'}
                onChange={(e) => setSkillType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="teach-skill">
                Posso ensinar
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="skillType"
                id="learn-skill"
                value="aprender"
                checked={skillType === 'aprender'}
                onChange={(e) => setSkillType(e.target.value)}
              />
              <label className="form-check-label" htmlFor="learn-skill">
                Quero aprender
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="skill-details" className="form-label">Detalhes (opcional)</label>
            <textarea
              className="form-control"
              id="skill-details"
              rows={3}
              placeholder="Adicione informações relevantes..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Adicionar
            </button>
          </div>

          {message && (
            <div className={`mt-3 fw-medium text-${message.type === 'success' ? 'success' : 'danger'}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
