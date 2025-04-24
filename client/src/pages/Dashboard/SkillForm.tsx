import { useState } from 'react';
import { SkillFormProps } from '../../types';
import { toast } from 'react-toastify';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { addSkill, addSkillToLearn } from '../../services/skillService';

const SkillForm = ({ onSkillAdded, defaultType = 'domino' }: SkillFormProps) => {
  const [skillName, setSkillName] = useState('');
  const [skillType, setSkillType] = useState<'domino' | 'aprender'>(defaultType);
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleError = useErrorHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      toast.error('Usuário não autenticado.');
      return;
    }
    
    setLoading(true);

    try {
      const data = {
        name: skillName.trim(),
        userId: userId,
        details: details.trim(),
      };

      if (skillType === 'domino') {
        await addSkill(userId, data.name);
      } else {
        await addSkillToLearn(userId, data.name);
      }

      setSkillName('');
      setDetails('');
      toast.success('Habilidade adicionada com sucesso!');
      onSkillAdded();
    } catch (err) {
      handleError(err);
      console.error(err);
    } finally {
      setLoading(false);
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
                onChange={() => setSkillType('domino')}
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
                onChange={() => setSkillType('aprender')}
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
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adicionando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
