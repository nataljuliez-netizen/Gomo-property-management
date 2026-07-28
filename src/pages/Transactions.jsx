// src/pages/Transactions.jsx

import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

import SearchBar from "../components/landlords/SearchBar";

import TransactionCards from "../components/Transactions/TransactionCards";
import TransactionModal from "../components/Transactions/TransactionModal";
import DeleteTransactionModal from "../components/Transactions/DeleteTransactionModal";

import ExpenseCards from "../components/Expenses/ExpenseCards";
import ExpenseModal from "../components/Expenses/ExpenseModal";
import DeleteExpenseModal from "../components/Expenses/DeleteExpenseModal";

import {
  getAllTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactionService";

import {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

import { getTenants } from "../services/tenantService";
import { getProperties } from "../services/propertyService";
import { getUnits } from "../services/unitService";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [units, setUnits] = useState([]);

  const [search, setSearch] = useState("");

  const [showTransactionModal, setShowTransactionModal] =
    useState(false);

  const [showExpenseModal, setShowExpenseModal] =
    useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [selectedExpense, setSelectedExpense] =
    useState(null);

  const [showDeleteTransaction, setShowDeleteTransaction] =
    useState(false);

  const [showDeleteExpense, setShowDeleteExpense] =
    useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setTransactions(getAllTransactions());
    setExpenses(getAllExpenses());

    setTenants(getTenants());
    setProperties(getProperties());
    setUnits(getUnits());
  }

  function saveTransaction(data) {
    if (selectedTransaction) {
      updateTransaction(data);
    } else {
      addTransaction(data);
    }

    loadData();

    setShowTransactionModal(false);
    setSelectedTransaction(null);
  }

  function saveExpense(data) {
    if (selectedExpense) {
      updateExpense(data);
    } else {
      addExpense(data);
    }

    loadData();

    setShowExpenseModal(false);
    setSelectedExpense(null);
  }

  function confirmDeleteTransaction() {
    deleteTransaction(selectedTransaction.id);

    loadData();

    setShowDeleteTransaction(false);
    setSelectedTransaction(null);
  }

  function confirmDeleteExpense() {
    deleteExpense(selectedExpense.id);

    loadData();

    setShowDeleteExpense(false);
    setSelectedExpense(null);
  }

  const filteredTransactions = transactions.filter((t) => {
    const text = search.toLowerCase();

    return (
      t.tenantName?.toLowerCase().includes(text) ||
      t.propertyName?.toLowerCase().includes(text) ||
      t.unitNumber?.toLowerCase().includes(text) ||
      t.billingPeriod?.toLowerCase().includes(text)
    );
  });

  const filteredExpenses = expenses.filter((e) => {
    const text = search.toLowerCase();

    return (
      e.expenseName?.toLowerCase().includes(text) ||
      e.propertyName?.toLowerCase().includes(text) ||
      e.notes?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="space-y-8">

      <PageHeader
        title="Transactions"
        subtitle="Manage rental income and expenses."
      />

      <Card>

        <div className="flex justify-between items-center mb-4">

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <div className="flex gap-2">

            <Button
              onClick={() => {
                setSelectedTransaction(null);
                setShowTransactionModal(true);
              }}
            >
              + Record Rent
            </Button>

            <Button
              onClick={() => {
                setSelectedExpense(null);
                setShowExpenseModal(true);
              }}
            >
              + Record Expense
            </Button>

          </div>

        </div>

      </Card>

      <section className="space-y-4">

        <h2 className="text-xl font-semibold">
          Rental Income
        </h2>

        <TransactionCards
          transactions={filteredTransactions}
          onEdit={(transaction) => {
            setSelectedTransaction(transaction);
            setShowTransactionModal(true);
          }}
          onDelete={(transaction) => {
            setSelectedTransaction(transaction);
            setShowDeleteTransaction(true);
          }}
        />

      </section>

      <section className="space-y-4">

        <h2 className="text-xl font-semibold">
          Expenses
        </h2>

        <ExpenseCards
          expenses={filteredExpenses}
          onEdit={(expense) => {
            setSelectedExpense(expense);
            setShowExpenseModal(true);
          }}
          onDelete={(expense) => {
            setSelectedExpense(expense);
            setShowDeleteExpense(true);
          }}
        />

      </section>

      <TransactionModal
        open={showTransactionModal}
        onClose={() => {
          setShowTransactionModal(false);
          setSelectedTransaction(null);
        }}
        onSave={saveTransaction}
        transaction={selectedTransaction}
        tenants={tenants}
        properties={properties}
        units={units}
      />

      <ExpenseModal
        open={showExpenseModal}
        onClose={() => {
          setShowExpenseModal(false);
          setSelectedExpense(null);
        }}
        onSave={saveExpense}
        expense={selectedExpense}
        properties={properties}
      />

      <DeleteTransactionModal
        open={showDeleteTransaction}
        onClose={() => {
          setShowDeleteTransaction(false);
          setSelectedTransaction(null);
        }}
        onConfirm={confirmDeleteTransaction}
        transaction={selectedTransaction}
      />

      <DeleteExpenseModal
        open={showDeleteExpense}
        onClose={() => {
          setShowDeleteExpense(false);
          setSelectedExpense(null);
        }}
        onConfirm={confirmDeleteExpense}
        expense={selectedExpense}
      />

    </div>
  );
}