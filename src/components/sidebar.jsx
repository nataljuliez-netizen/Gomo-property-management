import {
  LayoutDashboard,
  Building2,
  Home,
  DoorOpen,
  Users,
  Receipt,
  FolderOpen,
  FileBarChart2,
  NotebookPen,
  ClipboardList,
  Settings,
  RefreshCcw,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { rolePermissions } from "../services/rolePermissions";
import { useAuth } from "../context/AuthContext";

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Landlords",
    path: "/landlords",
    icon: Users,
  },
  {
    name: "Properties",
    path: "/properties",
    icon: Building2,
  },
  {
    name: "Units",
    path: "/units",
    icon: DoorOpen,
  },
  {
    name: "Tenants",
    path: "/tenants",
    icon: Home,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: Receipt,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: FolderOpen,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileBarChart2,
  },
  {
    name: "Notes",
    path: "/notes",
    icon: NotebookPen,
  },
  {
    name: "Audit Log",
    path: "/audit-log",
    icon: ClipboardList,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const { role, logout } = useAuth();

  const allowedRoutes = rolePermissions[role] || [];

  function switchWorkspace() {
    logout();
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-3xl font-bold text-emerald-600">
          GOMO
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Property Management
        </p>
      </div>

      {/* Current Workspace */}
      <div className="border-b border-slate-200 px-6 py-5">
        <p className="text-xs uppercase tracking-wider text-slate-400">
          Current Workspace
        </p>

        <div className="mt-2 rounded-xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-700">
          {role}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {links
          .filter((link) => allowedRoutes.includes(link.path))
          .map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <button
          onClick={switchWorkspace}
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <RefreshCcw size={18} />
          Switch Workspace
        </button>

        <button
          onClick={switchWorkspace}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={18} />
          Exit Workspace
        </button>

        <div className="mt-5 border-t border-slate-100 pt-4 text-center">
          <p className="text-xs text-slate-400">
            GOMO Property Management
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Version 1.0
          </p>
        </div>
      </div>
    </aside>
  );
}