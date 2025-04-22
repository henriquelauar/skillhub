import { useCallback, useEffect, useState } from 'react';
import { getUserById } from '../services/userService';
import { getOwnedSkills, getSkillsToLearn, deleteSkill } from '../services/skillService';
import { Skill, UserData } from '../types';
import { getUserId } from './useAuth';

export const useDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsToLearn, setSkillsToLearn] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const userId = getUserId();

  const loadSkills = useCallback(async () => {
    if (!userId) return;
    try {
      const [owned, toLearn] = await Promise.all([
        getOwnedSkills(userId),
        getSkillsToLearn(userId),
      ]);
      setSkills(owned);
      setSkillsToLearn(toLearn);
    } catch (err) {
      setError('Erro ao carregar habilidades');
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setError('Usuário não está logado.');
      return;
    }

    getUserById(userId)
      .then(setUserData)
      .catch(err => {
        setError('Erro ao carregar usuário');
        console.error(err);
      });

    loadSkills();
  }, [userId, loadSkills]);

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
  };
};
