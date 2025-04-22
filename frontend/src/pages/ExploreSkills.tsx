import { useEffect, useState } from "react";
import api from "../services/api";
import { Match } from "../types";
import Layout from "../components/layout/Layout.tsx"
import * as bs from "bootstrap";
import { createMatch } from "../services/matchService.tsx";
import { FaSearch, FaFilter } from "react-icons/fa";

const ExploreSkills = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [existingMatches, setExistingMatches] = useState<{ receiverId: number, skillName: string }[]>([]);

  const id = localStorage.getItem("userId");
  const userId = Number(id);

  const handleCreateMatch = async (receiverId: number, skillName: string) => {
    try {
      await createMatch(userId, receiverId, skillName);
      setExistingMatches(prev => [...prev, { receiverId, skillName }]);
    } catch (err: any) {
      console.error("Erro ao fazer match:", err.response?.data || err.message);
      alert("Erro ao fazer match. Verifique os dados.");
    }
  };

  useEffect(() => {
    if (!userId) return;

    // Buscar os usuários que ensinam as skills que o user quer aprender
    api.get(`/skills/matches/${userId}`).then((res) => {
      setMatches(res.data);
    });

    // Buscar matches existentes para ocultar os já feitos
    api.get(`/matches/user/${userId}`).then((res) => {
      const formatted = res.data.map((m: any) => ({
        receiverId: m.receiverId,
        skillName: m.skill.name // ou m.skillName, dependendo do seu retorno
      }));
      setExistingMatches(formatted);
    });
  }, []);

  useEffect(() => {
    const trigger = document.getElementById("menuButton");
    const sidebar = document.getElementById("mobileSidebar");

    if (trigger && sidebar) {
      const offcanvas = new bs.Offcanvas(sidebar);
      trigger.addEventListener("click", () => offcanvas.toggle());
    }
  }, []);

  const isAlreadyMatched = (receiverId: number, skillName: string) => {
    return existingMatches.some(
      (m) => m.receiverId === receiverId && m.skillName.toLowerCase() === skillName.toLowerCase()
    );
  };

  return (
    <Layout>
      <div className="container py-4">

        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <h5 className="text-xl font-semibold mb-3">
            Encontre pessoas para aprender
          </h5>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Busque por nome, email ou habilidade..."
            />
            <button className="btn btn-outline-secondary d-flex align-items-center gap-1">
              <FaFilter />
              Filtros
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          {matches.length === 0 ? (
            <div className="text-center text-muted py-5">
              <FaSearch size={48} className="mb-3" />
              <h6 className="text-lg font-semibold">Nenhum resultado encontrado</h6>
              <p className="mb-0">
                Você ainda não adicionou habilidades que deseja aprender ou
                não há usuários que ensinem essas habilidades.
              </p>
            </div>
          ) : (
            matches.map((match, idx) => {
              // Filtrar professores que ainda não possuem match com essa skill
              const availableTeachers = match.teachers.filter(
                (teacher) => !isAlreadyMatched(teacher.id, match.skillName)
              );

              if (availableTeachers.length === 0) return null;

              return (
                <div key={idx} className="mb-3 border-b pb-3 border-gray-200">
                  <h6 className="fw-bold text-primary">{match.skillName}</h6>
                  <ul className="list-group mt-2">
                    {availableTeachers.map((teacher) => (
                      <li
                        key={teacher.id}
                        className="list-group-item d-flex justify-content-between align-items-center mt-2 rounded shadow-sm"
                      >
                        <span>
                          {teacher.name} ({teacher.email})
                        </span>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleCreateMatch(teacher.id, match.skillName)}
                        >
                          Fazer Match
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ExploreSkills;
