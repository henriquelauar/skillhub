import { ReactNode, useEffect } from "react";
import * as bs from "bootstrap";
import { Sidebar } from "../layout/Sidebar";
import Topbar from "../layout/TopBar";

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const trigger = document.getElementById("menuButton");
    const sidebar = document.getElementById("mobileSidebar");

    if (trigger && sidebar) {
      const offcanvas = new bs.Offcanvas(sidebar);
      trigger.addEventListener("click", () => offcanvas.toggle());
    }
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Topbar />

        <div className="container py-4">
          {children}
        </div>
      </div>

      <Sidebar mobile />
    </div>
  );
};