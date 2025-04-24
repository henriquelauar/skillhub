import { Link } from "react-router-dom";
import { useState } from "react";
import AnimatedPage from "./layout/AnimatedPage";
import { Skill } from "../types";

type Props = {
  userId: number;
  name: string;
  email: string;
  skillName: string;
  isLearning: boolean;
  isMatched?: boolean;
  onMatch?: () => void;
  status?: 'pendente' | 'enviado' | 'recebido' | 'aceito';
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  mySkills?: Skill[];
};

export default function UserMatchCard({
  userId,
  name,
  email,
  skillName,
  isLearning,
  isMatched = false,
  onMatch,
  status,
  onAccept,
  onReject,
  onCancel,
  mySkills,
}: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (onMatch && !isMatched && !clicked) {
      onMatch();
      setClicked(true);
    }
  };

  const matchIsPossible = mySkills?.some(
    (s) =>
      s.name.toLowerCase() === skillName.toLowerCase() &&
      s.isLearning === true &&
      isLearning === false
  );

  return (
    <AnimatedPage>
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`}
            className="rounded-circle me-3"
            width="48"
            height="48"
            alt={name}
            onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
          />
          <div>
            <h6 className="mb-0">{name}</h6>
            <p className="text-muted small mb-0">{email}</p>
          </div>
        </div>
        <h6 className="mb-2">
          {skillName}{" "}
          {isLearning === true ? (
            <span className="badge bg-warning text-dark ms-2 text-uppercase">Aprendendo</span>
          ) : (
            <span className="badge bg-success ms-2 text-uppercase">Ensinando</span>
          )}
        </h6>
        {status === 'enviado' && (
          <p className="text-muted small mb-3">Você enviou este match</p>
        )}

        {status === 'recebido' && (
          <p className="text-muted small mb-3">Você recebeu este match</p>
        )}

        {status === 'aceito' && (
          <p className="badge bg-success w-100 py-2 text-center mb-2">Match aceito 🎉</p>
        )}

        <div className="d-flex gap-2 flex-wrap">
          <Link to={`/profile/${userId}`} className="btn btn-primary w-100">
            Ver perfil
          </Link>
          
          {onMatch && !status && matchIsPossible === true && (
            <button
              className={`btn w-100 ${
                isLearning ? "invisible" : clicked || isMatched ? "btn-secondary" : "btn-success"
              }`}
              disabled={clicked || isMatched || isLearning}
              onClick={handleClick}
            >
              {clicked || isMatched ? "Match enviado" : "Fazer match"}
            </button>
          )}

          {status === 'recebido' && (
            <>
              <button className="btn btn-success w-100" onClick={onAccept}>
                Aceitar
              </button>
              <button className="btn btn-danger w-100" onClick={onReject}>
                Recusar
              </button>
            </>
          )}

          {status === 'enviado' && (
            <button className="btn btn-danger w-100" onClick={onCancel}>
              Cancelar match
            </button>
          )}

          {status === 'pendente' && (
            <span className="badge bg-warning-subtle text-dark w-100 py-2 text-center">
              Match pendente
            </span>
          )}

          {status === 'aceito' && (
            <button className="btn btn-danger w-100" onClick={onCancel}>
              Cancelar match
            </button>
          )}
        </div>
      </div>
    </div>
    </AnimatedPage>
  );
}
