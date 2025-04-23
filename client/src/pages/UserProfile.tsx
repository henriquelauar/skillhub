import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../services/userService";
import { getOwnedSkills } from "../services/skillService";
import { getMatchesByUser, createMatch } from "../services/matchService";
import Layout from "../components/layout/Layout";
import { UserData, Match, Skill } from "../types";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { id } = useParams();
  const profileId = Number(id);
  const currentUserId = Number(localStorage.getItem("userId"));

  const [user, setUser] = useState<UserData | null>(null);
  const [userSkills, setUserSkills] = useState([]);
  const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMatch = async (skillName: string) => {
    try {
      await createMatch(currentUserId, profileId, skillName);
      setMatchedSkills((prev) => [...prev, skillName]);
      toast.success('Match criado com sucesso')
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!profileId || !currentUserId) return;

    const loadData = async () => {
      try {
        const [userData, skillsToLearn, matchData] = await Promise.all([
          getUserById(profileId),
          getOwnedSkills(profileId),
          getMatchesByUser(currentUserId),
        ]);

        setUser(userData);
        setUserSkills(skillsToLearn);

        const alreadyMatchedSkills = matchData
          .filter((m: Match) => m.receiverId === profileId)
          .map((m: Match) => m.skillName);
        setMatchedSkills(alreadyMatchedSkills);
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, currentUserId, profileId]);

  if (loading) {
    return (
      <Layout title="Perfil do Usuário">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Carregando perfil...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="Perfil do usuário">
        <div className="container py-5 text-center text-muted">
          Usuário não encontrado.
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Perfil do usuário">
      <div className="container py-4">
        <div className="card mb-4">
          <div className="card-body d-flex align-items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
              className="rounded-circle me-3"
              width="60"
              height="60"
              alt={user.name}
            />
            <div>
              <h5 className="mb-0">{user.name}</h5>
              <p className="mb-0 text-muted">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-light">
            <h6 className="mb-0">Habilidades que {user.name} ensina</h6>
          </div>
          <div className="card-body">
            {userSkills.length === 0 ? (
              <p className="text-muted">Este usuário ainda não adicionou habilidades.</p>
            ) : (
              <ul className="list-group">
                {userSkills.map((skill: Skill, idx) => {
                  const alreadyMatched = matchedSkills.includes(skill.name);
                  return (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{skill.name}</span>
                      {alreadyMatched ? (
                        <span className="badge bg-success">Match já feito</span>
                      ) : (
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleMatch(skill.name)}
                          
                        >
                          Fazer Match
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
