// src/services/transactionService.js

import { notifyDashboard } from "./dashboardEvents";

const STORAGE_KEY = "gomo_transactions";

function getTransactions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function calculateRentDue(rentPayable, rentPaid) {
  const payable = Number(rentPayable) || 0;
  const paid = Number(rentPaid) || 0;

  return Math.max(payable - paid, 0);
}

function calculateStatus(rentPayable, rentPaid) {
  const payable = Number(rentPayable) || 0;
  const paid = Number(rentPaid) || 0;

  if (paid <= 0) return "Due";
  if (paid < payable) return "Partially Paid";
  return "Paid";
}

export function getAllTransactions() {
  return getTransactions();
}

export function addTransaction(transaction) {
  const transactions = getTransactions();

  const newTransaction = {
    id: Date.now().toString(),
    ...transaction,

    rentPayable: Number(transaction.rentPayable),
    rentPaid: Number(transaction.rentPaid),

    rentDue: calculateRentDue(
      transaction.rentPayable,
      transaction.rentPaid
    ),

    status: calculateStatus(
      transaction.rentPayable,
      transaction.rentPaid
    ),

    createdAt: new Date().toISOString(),
  };

  transactions.push(newTransaction);

  saveTransactions(transactions);
  notifyDashboard();

  return newTransaction;
}

export function updateTransaction(updatedTransaction) {
  const transactions = getTransactions();

  const updated = transactions.map((transaction) => {
    if (transaction.id !== updatedTransaction.id) {
      return transaction;
    }

    return {
      ...updatedTransaction,

      rentPayable: Number(updatedTransaction.rentPayable),
      rentPaid: Number(updatedTransaction.rentPaid),

      rentDue: calculateRentDue(
        updatedTransaction.rentPayable,
        updatedTransaction.rentPaid
      ),

      status: calculateStatus(
        updatedTransaction.rentPayable,
        updatedTransaction.rentPaid
      ),
    };
  });

  saveTransactions(updated);
  notifyDashboard();
}

export function deleteTransaction(id) {
  const transactions = getTransactions().filter(
    (transaction) => transaction.id !== id
  );

  saveTransactions(transactions);
  notifyDashboard();
}