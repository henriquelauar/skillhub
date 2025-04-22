/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tab, Tabs } from 'react-bootstrap';
import { BsClock, BsSend, BsInbox, BsCheck2Circle } from 'react-icons/bs'

interface MatchTabsProps {
  activeKey: string;
  onSelectTab: (key: 'pendentes' | 'enviados' | 'recebidos' | 'aceitos') => void;
}

const MatchTabs: React.FC<MatchTabsProps> = ({ activeKey, onSelectTab }) => {
  return (
    <div className="py-4">
      <div className="bg-white rounded shadow-sm p-3">
        <h5 className="mb-3 d-flex align-items-center">
          <span role="img" aria-label="match" className="me-2">👥</span>
          Meus Matches
        </h5>
        <p className="text-muted">Gerencie suas conexões e solicitações de match com outros usuários.</p>

        <Tabs
          id="match-tabs"
          activeKey={activeKey}
          onSelect={(k) => onSelectTab(k as any)}
          className="mb-4 flex-wrap"
          justify
        >
          <Tab eventKey="pendentes" title={<><BsClock className="me-1" />Pendentes</>} />
          <Tab eventKey="enviados" title={<><BsSend className="me-1" />Enviados</>} />
          <Tab eventKey="recebidos" title={<><BsInbox className="me-1" />Recebidos</>} />
          <Tab eventKey="aceitos" title={<><BsCheck2Circle className="me-1" />Aceitos</>} />
        </Tabs>
      </div>
    </div>
  );
};

export default MatchTabs;

