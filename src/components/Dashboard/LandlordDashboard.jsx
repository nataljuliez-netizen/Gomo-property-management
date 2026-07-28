import {
  Building2,
  DoorOpen,
  Users,
  DollarSign,
  Plus,
  Home,
  Receipt,
  NotebookPen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Card from "../common/Card";

export default function LandlordDashboard() {
  const navigate = useNavigate();

  const properties =
    JSON.parse(localStorage.getItem("properties")) || [];

  const units =
    JSON.parse(localStorage.getItem("units")) || [];

  const tenants =
    JSON.parse(localStorage.getItem("tenants")) || [];

  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const occupiedUnits = units.filter(
    (unit) => unit.status === "Occupied"
  ).length;

  const vacantUnits = units.filter(
    (unit) => unit.status === "Vacant"
  ).length;

  const monthlyIncome = transactions.reduce(
    (sum, transaction) =>
      sum + Number(transaction.rentPaid || 0),
    0
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-slate-500">
            Here's an overview of your property portfolio.
          </p>
        </div>

      </div>

      {/* Quick Actions */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <button
            onClick={() => navigate("/properties")}
            className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-emerald-50"
          >
            <Building2 className="text-emerald-600" />

            <div className="text-left">
              <p className="font-semibold">
                Add Property
              </p>

              <p className="text-sm text-slate-500">
                Create a property
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/tenants")}
            className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-blue-50"
          >
            <Home className="text-blue-600" />

            <div className="text-left">
              <p className="font-semibold">
                Add Tenant
              </p>

              <p className="text-sm text-slate-500">
                Register tenant
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/transactions")}
            className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-amber-50"
          >
            <Receipt className="text-amber-600" />

            <div className="text-left">
              <p className="font-semibold">
                Record Payment
              </p>

              <p className="text-sm text-slate-500">
                Add transaction
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-purple-50"
          >
            <NotebookPen className="text-purple-600" />

            <div className="text-left">
              <p className="font-semibold">
                Add Reminder
              </p>

              <p className="text-sm text-slate-500">
                Create note
              </p>
            </div>
          </button>

        </div>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Properties"
          value={properties.length}
          icon={<Building2 size={22} />}
        />

        <Card
          title="Units"
          value={units.length}
          icon={<DoorOpen size={22} />}
        />

        <Card
          title="Tenants"
          value={tenants.length}
          icon={<Users size={22} />}
        />

        <Card
          title="Rental Income"
          value={`R ${monthlyIncome.toLocaleString()}`}
          icon={<DollarSign size={22} />}
        />

      </div>

      {/* Lower Grid */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold">
            Unit Status
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Occupied Units</span>

              <span className="font-bold text-emerald-600">
                {occupiedUnits}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Vacant Units</span>

              <span className="font-bold text-red-500">
                {vacantUnits}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Units</span>

              <span className="font-bold">
                {units.length}
              </span>
            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold">
            Recent Transactions
          </h2>

          {transactions.length === 0 ? (
            <p className="text-slate-500">
              No transactions recorded.
            </p>
          ) : (
            <div className="space-y-4">

              {transactions
                .slice(-5)
                .reverse()
                .map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between border-b pb-3 last:border-b-0"
                  >
                    <div>

                      <p className="font-medium">
                        {transaction.tenantName}
                      </p>

                      <p className="text-sm text-slate-500">
                        {transaction.propertyName}
                      </p>

                    </div>

                    <span className="font-semibold text-emerald-600">
                      R{" "}
                      {Number(
                        transaction.rentPaid || 0
                      ).toLocaleString()}
                    </span>

                  </div>
                ))}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}