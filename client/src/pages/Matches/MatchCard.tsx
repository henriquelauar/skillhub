import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

interface MatchCardProps {
  name: string;
  email: string;
  skill: string;
  status: "pendente" | "enviado" | "recebido" | "aceito";
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  name,
  email,
  skill,
  status,
  onAccept,
  onReject,
  onCancel,
}) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs={2} className="text-center">
            <PersonCircle size={40} />
          </Col>
          <Col xs={10}>
            <h5 className="mb-0">{name}</h5>
            <small className="text-muted">{email}</small>
            <p className="mb-1 mt-2">
              <strong>Habilidade:</strong> {skill}
            </p>
            <div className="d-flex gap-2 flex-wrap">
              {status === "pendente" && (
                <>
                  <Button variant="success" size="sm" onClick={onAccept}>
                    Aceitar
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={onReject}>
                    Recusar
                  </Button>
                </>
              )}
              {status === "enviado" && (
                <Button variant="outline-danger" size="sm" onClick={onCancel}>
                  Cancelar solicitação
                </Button>
              )}
              {status === "recebido" && (
                <>
                  <Button variant="success" size="sm" onClick={onAccept}>
                    Aceitar
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={onReject}>
                    Recusar
                  </Button>
                </>
              )}
              {status === "aceito" && (
                <span className="badge bg-success">Match aceito</span>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MatchCard;
