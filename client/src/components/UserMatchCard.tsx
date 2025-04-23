import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
  userId: number;
  name: string;
  email: string;
  skillName: string;
  isMatched?: boolean;
  onMatch?: () => void;
  status?: 'pendente' | 'enviado' | 'recebido' | 'aceito';
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
};

export default function UserMatchCard({
  userId,
  name,
  email,
  skillName,
  isMatched = false,
  onMatch,
  status,
  onAccept,
  onReject,
  onCancel,
}: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (onMatch && !isMatched && !clicked) {
      onMatch();
      setClicked(true);
    }
  };

  return (
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
        <h6 className="mb-2">{skillName}</h6>
        <p className="text-muted small mb-2">
          Está envolvido com <strong>{skillName}</strong>.
        </p>

        {status === 'enviado' && (
          <p className="text-muted small mb-3">Você enviou este match</p>
        )}

        {status === 'recebido' && (
          <p className="text-muted small mb-3">Você recebeu este match</p>
        )}
        <div className="d-flex gap-2 flex-wrap">
          <Link to={`/profile/${userId}`} className="btn btn-outline-primary w-100">
            Ver perfil
          </Link>

          {/* Descoberta de matches */}
          {onMatch && !status && (
            <button
              className={`btn ${clicked || isMatched ? "btn-secondary" : "btn-success"} w-100`}
              disabled={clicked || isMatched}
              onClick={handleClick}
            >
              {clicked || isMatched ? "Match enviado" : "Fazer match"}
            </button>
          )}

          {/* Status de match existente */}
          {status === 'recebido' && (
            <>
              <button className="btn btn-success w-50" onClick={onAccept}>
                Aceitar
              </button>
              <button className="btn btn-danger w-50" onClick={onReject}>
                Recusar
              </button>
            </>
          )}

          {status === 'enviado' && (
            <button className="btn btn-warning w-100" onClick={onCancel}>
              Cancelar match
            </button>
          )}

          {status === 'pendente' && (
            <span className="badge bg-warning-subtle text-dark w-100 py-2 text-center">
              Match pendente
            </span>
          )}

          {status === 'aceito' && (
            <span className="badge bg-success w-100 py-2 text-center">Match aceito 🎉</span>
          )}
        </div>
      </div>
    </div>
  );
}
