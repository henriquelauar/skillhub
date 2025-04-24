import { useState, useEffect } from "react";
import api from "../../services/api";
import { getSkillsToLearn } from "../../services/skillService";
import { createMatch } from "../../services/matchService";
import { toast } from "react-toastify";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { UserData, Skill } from "../../types";

export const useExplore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [groupedResults, setGroupedResults] = useState<Record<string, { user: UserData; skill: Skill }[]>>({});
  const [matchedUsersByName, setMatchedUsersByName] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [mySkills, setMySkills] = useState<Skill[]>([]);

  const userId = Number(localStorage.getItem("userId"));
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkillsToLearn(userId);
        setMySkills(data);
      } catch (err) {
        handleError(err);
      }
    };

    fetchSkills();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      handleError("Digite algo para buscar");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(`/users/search?query=${searchQuery}`);
      const filtered = res.data.filter((u: UserData) => u.id !== userId);

      const grouped: Record<string, { user: UserData; skill: Skill }[]> = {};
      const nameMatches: UserData[] = [];

      filtered.forEach((user: UserData) => {
        const isNameMatch = user.name.toLowerCase().includes(searchQuery.toLowerCase());

        if (isNameMatch) {
          nameMatches.push(user);
        }

        user.skills?.forEach((skill: Skill) => {
          if (skill.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            if (!grouped[skill.name]) {
              grouped[skill.name] = [];
            }
            grouped[skill.name].push({ user, skill });
          }
        });
      });

      setMatchedUsersByName(nameMatches);
      setGroupedResults(grouped);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async (receiverId: number, skillName: string) => {
    try {
      await createMatch(userId, receiverId, skillName);
      toast.success("Match enviado!");
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setGroupedResults({});
        setMatchedUsersByName([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    handleMatch,
    groupedResults,
    matchedUsersByName,
    loading,
    mySkills,
  };
};
