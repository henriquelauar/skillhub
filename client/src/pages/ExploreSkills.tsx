import { useEffect, useState } from "react";
import { APIMatch, Match } from "../types";
import { createMatch } from "../services/matchService.tsx";
import { FaSearch, FaFilter } from "react-icons/fa";
import Layout from "../components/layout/Layout.tsx";
import api from "../services/api";
import * as bs from "bootstrap";
import UserMatchCard from "../components/UserMatchCard.tsx";
import { toast } from "react-toastify";

const ExploreSkills = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [alreadyMatched, setAlreadyMatched] = useState<{ id: number; skillName: string }[]>([]);
  
  const userId = Number(localStorage.getItem("userId"));

  const handleCreateMatch = async (receiverId: number, skillName: string) => {
    try {
      await createMatch(userId, receiverId, skillName);
      toast.success("Match enviado com sucesso!");
      setAlreadyMatched((prev) => [...prev, { id: receiverId, skillName }]);
    } catch (err) {
      toast.error("Erro ao enviar o match.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userId) return;

    api.get(`/skills/matches/${userId}`).then((res) => {
      setMatches(res.data);
    });

    api.get(`/matches/user/${userId}`).then((res) => {
      const formatted = res.data.map((m: APIMatch) => ({
        id: m.receiverId,
        skillName: m.skill.name,
      }));
      setAlreadyMatched(formatted);
    });
  }, [userId]);

  useEffect(() => {
    const trigger = document.getElementById("menuButton");
    const sidebar = document.getElementById("mobileSidebar");

    if (trigger && sidebar) {
      const offcanvas = new bs.Offcanvas(sidebar);
      trigger.addEventListener("click", () => offcanvas.toggle());
    }
  }, []);

  const isAlreadyMatched = (userId: number, skillName: string) => {
    return alreadyMatched.some((m) => m.id === userId && m.skillName === skillName);
  };

  return (
    <Layout title="Explorar">
      <div className="container py-4">
        {/* 🔍 Barra de busca e filtro */}
        <div className="bg-white rounded-2xl shadow p-4 mb-4">
          <h5 className="text-xl fw-semibold mb-3">Encontre pessoas para aprender</h5>
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

        {/* 📄 Lista de resultados */}
        <div className="bg-white rounded-2xl shadow p-4">
          {matches.length === 0 ? (
            <div className="text-center text-muted py-5">
              <FaSearch size={48} className="mb-3" />
              <h6 className="fs-5 fw-semibold">Nenhum resultado encontrado</h6>
              <p className="mb-0">
                Você ainda não adicionou habilidades que deseja aprender ou
                não há usuários que ensinem essas habilidades.
              </p>
            </div>
          ) : (
            matches.map((match, idx) => {
              const availableTeachers = match.teachers.filter(
                (teacher) => !isAlreadyMatched(teacher.id, match.skillName)
              );

              if (availableTeachers.length === 0) return null;

              return (
                <div key={idx} className="mb-5">
                  <h6 className="fw-bold text-primary mb-3">{match.skillName}</h6>
                  <div className="row g-3">
                    {availableTeachers.map((teacher) => (
                      <div key={teacher.id} className="col-12 col-sm-6 col-lg-4">
                        <UserMatchCard
                          userId={teacher.id}
                          name={teacher.name}
                          email={teacher.email}
                          skillName={match.skillName}
                          isMatched={isAlreadyMatched(teacher.id, match.skillName)}
                          onMatch={() => handleCreateMatch(teacher.id, match.skillName)}
                        />
                      </div>
                    ))}
                  </div>
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
