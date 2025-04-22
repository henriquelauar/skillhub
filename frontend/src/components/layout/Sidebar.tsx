import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useDashboard } from "../../hooks/useDashboard";
import { logout } from "../../hooks/useAuth";

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = useDashboard();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }


  const isActive = (path: string) => location.pathname === path;

  const menuContent = (
    <>
      {/* Título */}
      <div className="border-bottom">

      <Link to="/" className="d-flex align-items-center mb-3 mb-md-4 text-decoration-none">
        <span className="fs-4 fw-bold text-primary">SkillHub</span>
      </Link>
      <p className="text-muted mb-4">Troca de habilidades</p>
      </div>

      {/* Avatar + Info */}
      <div className="d-flex align-items-center mb-4 mt-3">
        <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: 48, height: 48 }}>
          {userData?.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="ms-3">
          <div className="fw-semibold">{userData?.name}</div>
          <div className="text-muted small">{userData?.email}</div>
        </div>
      </div>

      {/* Navegação */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : "text-dark"}`}>
            <i className="bi bi-grid me-2" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/explore" className={`nav-link ${isActive("/explore") ? "active" : "text-dark"}`}>
            <i className="bi bi-search me-2" />
            Explorar Skills
          </Link>
        </li>
        <li>
          <Link to="/matches" className={`nav-link ${isActive("/matches") ? "active" : "text-dark"}`}>
            <i className="bi bi-people me-2" />
            Meus Matches
          </Link>
        </li>
        <li>
          <Link to="/profile" className={`nav-link ${isActive("/profile") ? "active" : "text-dark"}`}>
            <i className="bi bi-person me-2" />
            Perfil
          </Link>
        </li>
      </ul>

      {/* Sair */}
      <div className="mt-auto pt-4 border-top">
        <button onClick={handleLogout} className="btn btn-link text-decoration-none text-danger w-100 d-flex align-items-center justify-content-start gap-2">
          <FaSignOutAlt />
          Sair
        </button>
      </div>
    </>
  );

  if (mobile) {
    return (
      <div className="offcanvas offcanvas-start w-75" tabIndex={-1} id="mobileSidebar">
        <div className="offcanvas-body d-flex flex-column p-3">
          {menuContent}
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-none d-md-flex flex-column bg-white shadow-sm"
      style={{
        width: "280px",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        zIndex: '10000'
      }}
    >
      <div className="d-flex flex-column flex-grow-1 p-3 justify-content-between">
        {menuContent}
      </div>
    </div>
  );
}
