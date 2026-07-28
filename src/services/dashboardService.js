// src/services/dashboardService.js

import { getProperties } from "./propertyService";
import { getUnits } from "./unitService";
import { getTenants } from "./tenantService";
import { getAllTransactions } from "./transactionService";
import { getAllExpenses } from "./expenseService";
import { getAllNotes } from "./noteService";

export function getDashboardStats() {
  const properties = getProperties();
  const units = getUnits();
  const tenants = getTenants();
  const transactions = getAllTransactions();
  const expenses = getAllExpenses();
  const notes = getAllNotes();

  const today = new Date();

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const rentCollected = transactions.reduce(
    (total, transaction) =>
      total + (Number(transaction.rentPaid) || 0),
    0
  );

  const outstandingRent = transactions.reduce(
    (total, transaction) =>
      total + (Number(transaction.rentDue) || 0),
    0
  );

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + (Number(expense.amount) || 0),
    0
  );

  const netCashFlow =
    rentCollected - totalExpenses;

  const occupiedUnits = new Set(
    tenants
      .filter((tenant) => tenant.unitId)
      .map((tenant) => tenant.unitId)
  );

  const vacantUnits =
    units.length - occupiedUnits.size;

  const rentDueThisMonth = transactions.filter(
    (transaction) => {
      if (!transaction.dueDate) return false;

      const dueDate = new Date(
        transaction.dueDate
      );

      return (
        dueDate.getMonth() === currentMonth &&
        dueDate.getFullYear() === currentYear &&
        transaction.status !== "Paid"
      );
    }
  ).length;

  const overduePayments =
    transactions.filter((transaction) => {
      if (!transaction.dueDate) return false;

      return (
        new Date(transaction.dueDate) < today &&
        transaction.status !== "Paid"
      );
    }).length;

  const pendingNotes = notes
    .filter((note) => note.status === "Pending")
    .slice(0, 5);

  return {
    totalProperties: properties.length,
    totalUnits: units.length,
    totalTenants: tenants.length,

    rentCollected,
    outstandingRent,
    totalExpenses,

    netCashFlow,
    vacantUnits,
    rentDueThisMonth,
    overduePayments,

    pendingNotes,
  };
}