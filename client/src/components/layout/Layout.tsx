import { ReactNode } from "react";
import { Sidebar } from "../layout/Sidebar";
import Topbar from "../layout/TopBar";

export default function Layout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Topbar title={title}/>

        <div className="container py-4">
          {children}
        </div>
      </div>

      <Sidebar mobile />
    </div>
  );
};