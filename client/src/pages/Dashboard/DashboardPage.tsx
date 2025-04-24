import Layout from "../../components/layout/Layout";
import SkillForm from "./SkillForm";
import { useDashboard } from "../../hooks/useDashboard";
import PossibleMatches from "./PossibleMatches";
import PopularSkillsSection from "./PopularSkills";
import { useState } from "react";

export default function DashboardPage() {
  const {
    userData,
    skills,
    skillsToLearn,
    isModalOpen,
    setIsModalOpen,
    handleDeleteSkill,
    handleSkillAdded,
    loading,
  } = useDashboard();

  const [modalType, setModalType] = useState<'domino' | 'aprender'>('domino');

  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Carregando...</p>
        </div>
      </Layout>
    );
  };

  return (
    <Layout title="Dashboard">
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
            <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || 'Usuário')}`}
                className="rounded-circle me-3"
                width="80"
                height="80"
                alt={userData?.name}
              />
            <div>
              <h1 className="h4 mb-1">Olá, {userData?.name}!</h1>
              <p className="text-muted mb-0">
                Gerencie suas habilidades e encontre pessoas para trocar conhecimentos.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary ms-auto mt-3 mt-sm-0"
            >
              <i className="bi bi-plus me-2"></i>
              Adicionar Skill
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center bg-gradient bg-opacity-10">
              <h2 className="h5 mb-0 text-primary">
                <i className="bi bi-mortarboard me-2"></i>
                Habilidades que eu ensino
              </h2>
              <span className="badge bg-primary">{skills.length}</span>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="mb-1">
                      <h6>{skill.name}</h6>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      Excluir
                    </button>
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="text-muted">Nenhuma habilidade adicionada.</p>
                )}
              </div>
            </div>
            <div className="card-footer text-center">
              <button
                onClick={() => {setIsModalOpen(true); setModalType('domino')}}
                className="btn btn-outline-primary btn-sm w-100"
              >
                <i className="bi bi-plus me-2"></i>
                Adicionar habilidade que ensino
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header d-flex justify-content-between align-items-center bg-gradient bg-opacity-10">
              <h2 className="h5 mb-0 text-success">
                <i className="bi bi-book me-2"></i>
                Habilidades que quero aprender
              </h2>
              <span className="badge bg-success">{skillsToLearn.length}</span>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {skillsToLearn.map((skill) => (
                  <div
                    key={skill.id}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="mb-1">
                      <h6>{skill.name}</h6>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      Excluir
                    </button>
                  </div>
                ))}
                {skillsToLearn.length === 0 && (
                  <p className="text-muted">Nenhuma habilidade adicionada.</p>
                )}
              </div>
            </div>
            <div className="card-footer text-center">
              <button
                onClick={() => {setIsModalOpen(true); setModalType('aprender')}}
                className="btn btn-outline-success btn-sm w-100"
              >
                <i className="bi bi-plus me-2"></i>
                Adicionar habilidade que quero aprender
              </button>
            </div>
          </div>
        </div>
      </div>

      <PossibleMatches />
      <PopularSkillsSection />

      {isModalOpen && (
      <>
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          onClick={(e) => {
            const dialog = document.querySelector('.modal-dialog');
            if (dialog && !dialog.contains(e.target as Node)) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Nova Habilidade</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <SkillForm
                  onSkillAdded={handleSkillAdded}
                  onClose={() => setIsModalOpen(false)}
                  defaultType={modalType}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      </>
    )}

    </Layout>
  );
}
