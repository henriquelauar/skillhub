import { useState, useEffect } from "react";
import { createMatch } from "../services/matchService";
import { getSkillsToLearn } from "../services/skillService";
import api from "../services/api";
import { useErrorHandler } from "./useErrorHandler";
import { APIMatch, Skill } from "../types";
import { toast } from "react-toastify";

export const useMatchActions = (userId: number) => {
  const [mySkills, setMySkills] = useState<Skill[]>([]);
  const [existingMatches, setExistingMatches] = useState<{ receiverId: number; skillName: string }[]>([]);
  const handleError = useErrorHandler();

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await getSkillsToLearn(userId);
        setMySkills(data);
      } catch (err) {
        handleError(err);
      }
    };

    const loadMatches = async () => {
      try {
        const res = await api.get(`/matches/user/${userId}`);
        const formatted = res.data.map((m: APIMatch) => ({
          receiverId: m.receiverId,
          skillName: m.skill.name,
        }));
        setExistingMatches(formatted);
      } catch (err) {
        handleError(err);
      }
    };

    if (userId) {
      loadSkills();
      loadMatches();
    }
  }, [userId]);

  const sendMatch = async (receiverId: number, skillName: string) => {
    try {
      await createMatch(userId, receiverId, skillName);
      setExistingMatches(prev => [...prev, { receiverId, skillName }]);
      toast.success("Match enviado com sucesso!");
    } catch (err) {
      handleError(err);
    }
  };

  const isAlreadyMatched = (receiverId: number, skillName: string) =>
    existingMatches.some(
      (m) =>
        m.receiverId === receiverId &&
        m.skillName.toLowerCase() === skillName.toLowerCase()
    );

  return {
    mySkills,
    sendMatch,
    isAlreadyMatched,
  };
};
