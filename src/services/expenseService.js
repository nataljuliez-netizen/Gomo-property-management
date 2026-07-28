// src/services/expenseService.js

import { notifyDashboard } from "./dashboardEvents";

const STORAGE_KEY = "gomo_expenses";

function getExpenses() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveExpenses(expenses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function getAllExpenses() {
  return getExpenses();
}

export function addExpense(expense) {
  const expenses = getExpenses();

  const newExpense = {
    id: Date.now().toString(),

    expenseName: expense.expenseName,
    propertyId: expense.propertyId || "",
    propertyName: expense.propertyName || "",

    amount: Number(expense.amount),

    expenseDate: expense.expenseDate,

    notes: expense.notes || "",

    createdAt: new Date().toISOString(),
  };

  expenses.push(newExpense);

  saveExpenses(expenses);
  notifyDashboard();

  return newExpense;
}

export function updateExpense(updatedExpense) {
  const expenses = getExpenses();

  const updated = expenses.map((expense) =>
    expense.id === updatedExpense.id
      ? {
          ...updatedExpense,
          amount: Number(updatedExpense.amount),
        }
      : expense
  );

  saveExpenses(updated);
  notifyDashboard();
}

export function deleteExpense(id) {
  const expenses = getExpenses().filter(
    (expense) => expense.id !== id
  );

  saveExpenses(expenses);
  notifyDashboard();
}