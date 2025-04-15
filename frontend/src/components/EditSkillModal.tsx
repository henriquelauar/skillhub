import { useState, useEffect } from 'react';
import { Skill } from '../types';
import api from '../services/api';

interface Props {
    skill: Skill | null;
    onClose: () => void;
    onUpdate: () => void;
}

const EditSkillModal = ({ skill, onClose, onUpdate }: Props) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (skill) {
            setName(skill.name);
        }
    }, [skill]);

    const handleUpdate = async () => {
        if (!skill) return;
        try {
            await api.put(`/skills/${skill.id}`, { name });
            onUpdate();
            onClose();
        } catch (err) {
            console.error("Erro ao atualizar skill", err);
        }
    };

    if (!skill) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: '#000000aa' }}>
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5>Editar Skill</h5>
              <input
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default EditSkillModal;


