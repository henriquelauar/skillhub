import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../services/userService';
import { getOwnedSkills, getSkillsToLearn, deleteSkill } from '../services/skillService';
import { Skill, UserData } from '../types';
import { getUserId } from './useAuth';
import { useErrorHandler } from './useErrorHandler';

export const useDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsToLearn, setSkillsToLearn] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = getUserId();
  const handleError = useErrorHandler();

  const loadSkills = useCallback(async () => {
    if (!userId) {
      const msg = 'ID do usuário não encontrado ao carregar habilidades.';
      console.error(msg);
      setError(msg);
      return;
    }

    try {
      const [owned, toLearn] = await Promise.all([
        getOwnedSkills(userId),
        getSkillsToLearn(userId),
      ]);
      setSkills(owned);
      setSkillsToLearn(toLearn);
    } catch (err) {
      console.error('Erro ao carregar habilidades do usuário:', err);
      handleError(err);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        const msg = 'Usuário não está logado.';
        console.error(msg);
        setError(msg);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const user = await getUserById(userId);
        if (!user) {
          const msg = 'Dados do usuário não encontrados.';
          console.error(msg);
          setError(msg);
        } else {
          setUserData(user);
        }

        await loadSkills();
      } catch (err) {
        const msg = 'Erro ao carregar dados do dashboard.';
        console.error(msg, err);
        setError(msg);
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, loadSkills]);

  const handleDeleteSkill = async (skillId: number) => {
    try {
      await deleteSkill(skillId);
      setSkills(prev => prev.filter(skill => skill.id !== skillId));
      setSkillsToLearn(prev => prev.filter(skill => skill.id !== skillId));
    } catch (err) {
      const msg = `Erro ao deletar habilidade com ID ${skillId}.`;
      console.error(msg, err);
      handleError(err);
    }
  };

  return {
    userData,
    error,
    skills,
    skillsToLearn,
    isModalOpen,
    editingSkill,
    setIsModalOpen,
    setEditingSkill,
    handleDeleteSkill,
    handleSkillAdded: loadSkills,
    loading,
  };
};
