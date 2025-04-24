/* eslint-disable @typescript-eslint/no-explicit-any */
import { BsClock, BsSend, BsInbox, BsCheck2Circle } from 'react-icons/bs'

interface MatchTabsProps {
  activeKey: string;
  onSelectTab: (key: 'pendentes' | 'enviados' | 'recebidos' | 'aceitos') => void;
}

const MatchTabs: React.FC<MatchTabsProps> = ({ activeKey, onSelectTab }) => {
  const tabs = [
    { key: 'pendentes', label: 'Pendentes', icon: <BsClock /> },
    { key: 'enviados', label: 'Enviados', icon: <BsSend /> },
    { key: 'recebidos', label: 'Recebidos', icon: <BsInbox /> },
    { key: 'aceitos', label: 'Aceitos', icon: <BsCheck2Circle /> },
  ];

  return (
    <div className="py-4">
      <div className="bg-white rounded shadow-sm p-3">
        <h5 className="mb-3 d-flex align-items-center">
          <span role="img" aria-label="match" className="me-2">👥</span>
          Meus Matches
        </h5>
        <p className="text-muted">Gerencie suas conexões e solicitações de match com outros usuários.</p>

        <div className="row row-cols-4 g-2">
          {tabs.map(({ key, label, icon }) => (
            <div className="col" key={key}>
              <button
                className={`btn w-100 ${
                  activeKey === key ? 'btn-primary' : 'btn-outline-primary'
                } d-flex align-items-center justify-content-center`}
                onClick={() => onSelectTab(key as any)}
              >
                {icon}
                <span className="ms-1">{label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default MatchTabs;