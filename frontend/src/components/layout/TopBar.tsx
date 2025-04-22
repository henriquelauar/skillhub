import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as bs from "bootstrap";

const Topbar = () => {
  const location = useLocation();
  const path = location.pathname
  const afterSlash = path.split('/')[1];

  useEffect(() => {
    const trigger = document.getElementById("menuButton");
    const sidebar = document.getElementById("mobileSidebar");

    if (trigger && sidebar) {
      const offcanvas = new bs.Offcanvas(sidebar);
      trigger.addEventListener("click", () => offcanvas.toggle());
    }
  }, []);

  return (
    <div className="bg-white border-bottom shadow-sm px-3 py-3 d-flex align-items-center mb-4"
        style={{ position: "sticky", top: 0, zIndex: 1030 }}
    >
      <button
        id="menuButton"
        className="btn btn-outline-primary d-md-none me-3"
      >
        <i className="bi bi-list fs-4" />
      </button>
      <h1 className="h5 mb-0 text-dark">{afterSlash}</h1>
      <div className="d-md-none" style={{ width: "40px" }} />
    </div>
  );
};

export default Topbar;
