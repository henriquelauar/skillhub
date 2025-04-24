import { FC } from "react";

interface TopbarProps {
  title: string;
}

const Topbar: FC<TopbarProps> = ({ title }) => {
  return (
    <div
      className="bg-white border-bottom shadow-sm px-3 py-3 d-flex align-items-center mb-4"
      style={{ position: "sticky", top: 0, zIndex: 1030 }}
    >
      <button
        className="btn btn-outline-primary d-md-none me-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileSidebar"
      >
        <i className="bi bi-list fs-4" />
      </button>
      <h1 className="h5 mb-0 text-dark">{title}</h1>
      <div className="d-md-none" style={{ width: "40px" }} />
    </div>
  );
};

export default Topbar;
