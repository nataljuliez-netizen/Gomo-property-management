// src/pages/Dashboard.jsx

import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import {
  Building2,
  Home,
  Users,
  Wallet,
  Receipt,
  TrendingUp,
  AlertTriangle,
  ClipboardList,
  Plus,
} from "lucide-react";

import { useProperties } from "../hooks/useProperties";
import { useUnits } from "../hooks/useUnits";
import { useTenants } from "../hooks/useTenants";
import { useTransactions } from "../hooks/useTransactions";
import { useExpenses } from "../hooks/useExpenses";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
  }).format(Number(amount || 0));

export default function Dashboard() {
  const { properties } = useProperties();
  const { units } = useUnits();
  const { tenants } = useTenants();
  const { transactions } = useTransactions();
  const { expenses } = useExpenses();
  const { notes } = useNotes();

  const stats = useMemo(() => {
    const totalProperties = properties.length;
    const totalUnits = units.length;
    const totalTenants = tenants.length;

    const rentCollected = transactions.reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount || 0),
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );

    const occupiedUnits = tenants.filter(
      (tenant) => tenant.status === "Active"
    ).length;

    const vacantUnits = Math.max(
      totalUnits - occupiedUnits,
      0
    );

    return {
      totalProperties,
      totalUnits,
      totalTenants,

      rentCollected,
      outstandingRent: 0,
      totalExpenses,

      netCashFlow:
        rentCollected - totalExpenses,

      vacantUnits,

      rentDueThisMonth: 0,
      overduePayments: 0,

      pendingNotes: notes
  .filter((note) => note.status === "Pending")
  .sort(
    (a, b) =>
      new Date(a.dueDate) - new Date(b.dueDate)
  )
  .slice(0, 5),
    };
  }, [
    properties,
    units,
    tenants,
    transactions,
    expenses,
    notes,
  ]);

  const cards = [
    {
      title: "Properties",
      value: stats.totalProperties,
      icon: Building2,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Units",
      value: stats.totalUnits,
      icon: Home,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Tenants",
      value: stats.totalTenants,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rent Collected",
      value: formatCurrency(
        stats.rentCollected
      ),
      icon: Wallet,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Outstanding Rent",
      value: formatCurrency(
        stats.outstandingRent
      ),
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Expenses",
      value: formatCurrency(
        stats.totalExpenses
      ),
      icon: Receipt,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Welcome back! Here's an overview of your
          portfolio.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-sm border p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-slate-800">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`h-14 w-14 rounded-xl flex items-center justify-center ${card.color}`}
                >
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-green-600" />
            <h2 className="text-xl font-semibold">
              Quick Insights
            </h2>
          </div>

          <div className="space-y-4">
            <Insight
              title="Net Cash Flow"
              value={formatCurrency(
                stats.netCashFlow
              )}
            />

            <Insight
              title="Vacant Units"
              value={stats.vacantUnits}
            />

            <Insight
              title="Rent Due This Month"
              value={stats.rentDueThisMonth}
            />

            <Insight
              title="Overdue Payments"
              value={stats.overduePayments}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Notes & Reminders
            </h2>
          </div>

          {stats.pendingNotes.length === 0 ? (
            <p className="text-slate-500">
              No pending reminders.
            </p>
          ) : (
            <div className="space-y-4">
              {stats.pendingNotes.map((note) => (
                <div
                  key={note.id}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">
                      {note.title}
                    </h3>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        note.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : note.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {note.priority}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    {note.propertyName || "General"}
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    Due: {note.dueDate}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="text-indigo-600" />
          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ActionButton
            to="/properties"
            text="Add Property"
          />

          <ActionButton
            to="/tenants"
            text="Add Tenant"
          />

          <ActionButton
            to="/transactions"
            text="Record Rent"
          />

          <ActionButton
            to="/transactions"
            text="Record Expense"
          />
        </div>
      </div>
    </div>
  );
}

function Insight({ title, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <span className="text-slate-600">
        {title}
      </span>

      <span className="font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

function ActionButton({ to, text }) {
  return (
    <Link
      to={to}
      className="rounded-lg bg-indigo-600 text-white text-center py-3 font-medium hover:bg-indigo-700 transition"
    >
      {text}
    </Link>
  );
}