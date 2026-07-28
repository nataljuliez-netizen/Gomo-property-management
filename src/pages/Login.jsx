import {
  Building2,
  BriefcaseBusiness,
  Calculator,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import RoleCard from "../components/Login/RoleCard";
import { ROLES, selectRole } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

 function handleRole(role) {
  selectRole(role);
  window.location.replace("/");
}

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-emerald-50">

      {/* Background Glow */}

      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="absolute -right-40 top-20 h-[420px] w-[420px] rounded-full bg-blue-300/30 blur-3xl" />

      <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl" />

      {/* Grid */}

      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right,#0f172a 1px,transparent 1px),linear-gradient(to bottom,#0f172a 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-8">

        <div className="mb-16 text-center">

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-2xl">

            <Building2 size={44} />

          </div>

          <h1 className="text-6xl font-black tracking-tight text-slate-800">
            GOMO
          </h1>

          <p className="mt-4 text-xl text-slate-600">
            Property Management System
          </p>

          <p className="mt-2 text-slate-500">
            Choose your workspace to continue
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          <RoleCard
            title="Landlord"
            icon="🏠"
            color="#10b981"
            description="Monitor properties, view reports, track occupancy and stay updated with your investments."
            onClick={() =>
              handleRole(ROLES.LANDLORD)
            }
          />

          <RoleCard
            title="Property Manager"
            icon="👔"
            color="#2563eb"
            description="Manage tenants, properties, leases, maintenance and daily operations."
            onClick={() =>
              handleRole(ROLES.PROPERTY_MANAGER)
            }
          />

          <RoleCard
            title="Bookkeeper"
            icon="📒"
            color="#f59e0b"
            description="Manage rental income, expenses, reports and financial records."
            onClick={() =>
              handleRole(ROLES.BOOKKEEPER)
            }
          />

        </div>

        <div className="mt-14 text-center text-sm text-slate-500">
          GOMO v1.0 • Offline • Local Storage • No Internet Required
        </div>

      </div>
    </div>
  );
}