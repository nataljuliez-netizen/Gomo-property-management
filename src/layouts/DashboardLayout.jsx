import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <main className="ml-72 min-h-screen p-8">
        <Topbar />

        <Outlet />
      </main>
    </div>
  );
}