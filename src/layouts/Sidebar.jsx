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
} from "lucide-react";

import { NavLink } from "react-router-dom";

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
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-emerald-600">
          GOMO
        </h1>

        <p className="text-sm text-slate-500">
          Property Management
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-emerald-600 text-white"
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

      <div className="border-t border-slate-200 p-5 text-xs text-slate-400">
        GOMO Property Management v1.0
      </div>
    </aside>
  );
}