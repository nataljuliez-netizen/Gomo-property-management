import { useMemo, useState } from "react";

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
  useTransactions,
  useAddTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "../hooks/useTransactions";

import {
  useExpenses,
  useAddExpense,
  useUpdateExpense,
  useDeleteExpense,
} from "../hooks/useExpenses";

import { useTenants } from "../hooks/useTenants";
import { useProperties } from "../hooks/useProperties";
import { useUnits } from "../hooks/useUnits";

import { can } from "../services/permissionService";

export default function Transactions() {
  const { transactions = [] } = useTransactions();
  const { expenses = [] } = useExpenses();

  const { tenants = [] } = useTenants();
  const { properties = [] } = useProperties();
  const { units = [] } = useUnits();

  const addTransaction = useAddTransaction();
  const updateTransaction = useUpdateTransaction();
  const removeTransaction = useDeleteTransaction();

  const addExpense = useAddExpense();
  const updateExpense = useUpdateExpense();
  const removeExpense = useDeleteExpense();

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

  const canCreateTransaction = can("transaction.create");
  const canEditTransaction = can("transaction.edit");
  const canDeleteTransaction = can("transaction.delete");

  const canCreateExpense = can("expense.create");
  const canEditExpense = can("expense.edit");
  const canDeleteExpense = can("expense.delete");

  async function saveTransaction(data) {
    if (selectedTransaction) {
      if (!canEditTransaction) return;

      await updateTransaction.mutateAsync({
        ...selectedTransaction,
        ...data,
      });
    } else {
      if (!canCreateTransaction) return;

      await addTransaction.mutateAsync(data);
    }

    setShowTransactionModal(false);
    setSelectedTransaction(null);
  }

  async function saveExpense(data) {
    if (selectedExpense) {
      if (!canEditExpense) return;

      await updateExpense.mutateAsync({
        ...selectedExpense,
        ...data,
      });
    } else {
      if (!canCreateExpense) return;

      await addExpense.mutateAsync(data);
    }

    setShowExpenseModal(false);
    setSelectedExpense(null);
  }

  async function confirmDeleteTransaction() {
    if (!selectedTransaction) return;

    await removeTransaction.mutateAsync(
      selectedTransaction.id
    );

    setShowDeleteTransaction(false);
    setSelectedTransaction(null);
  }

  async function confirmDeleteExpense() {
    if (!selectedExpense) return;

    await removeExpense.mutateAsync(
      selectedExpense.id
    );

    setShowDeleteExpense(false);
    setSelectedExpense(null);
  }

  const filteredTransactions = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return transactions;

    return transactions.filter((transaction) => {
      const tenant =
        tenants.find(
          (t) => t.id === transaction.tenantId
        ) || {};

      const property =
        properties.find(
          (p) => p.id === transaction.propertyId
        ) || {};

      const unit =
        units.find(
          (u) => u.id === transaction.unitId
        ) || {};

      return [
        tenant.firstName,
        tenant.lastName,
        property.name,
        unit.unitNumber,
        transaction.category,
        transaction.type,
        transaction.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(text);
    });
  }, [
    transactions,
    tenants,
    properties,
    units,
    search,
  ]);

  const filteredExpenses = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return expenses;

    return expenses.filter((expense) => {
      const property =
        properties.find(
          (p) => p.id === expense.propertyId
        ) || {};

      const unit =
        units.find(
          (u) => u.id === expense.unitId
        ) || {};

      return [
        expense.category,
        expense.vendor,
        property.name,
        unit.unitNumber,
        expense.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(text);
    });
  }, [
    expenses,
    properties,
    units,
    search,
  ]);
   return (
    <div className="space-y-8">
      <PageHeader
        title="Transactions"
        subtitle="Manage rental income and expenses."
      />

      <Card>
        <div className="flex items-center justify-between mb-4">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <div className="flex gap-2">
            {canCreateTransaction && (
              <Button
                onClick={() => {
                  setSelectedTransaction(null);
                  setShowTransactionModal(true);
                }}
              >
                + Record Rent
              </Button>
            )}

            {canCreateExpense && (
              <Button
                onClick={() => {
                  setSelectedExpense(null);
                  setShowExpenseModal(true);
                }}
              >
                + Record Expense
              </Button>
            )}
          </div>
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Rental Income
        </h2>

        <TransactionCards
          transactions={filteredTransactions}
          tenants={tenants}
          properties={properties}
          units={units}
          onEdit={
            canEditTransaction
              ? (transaction) => {
                  setSelectedTransaction(transaction);
                  setShowTransactionModal(true);
                }
              : undefined
          }
          onDelete={
            canDeleteTransaction
              ? (transaction) => {
                  setSelectedTransaction(transaction);
                  setShowDeleteTransaction(true);
                }
              : undefined
          }
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Expenses
        </h2>

        <ExpenseCards
          expenses={filteredExpenses}
          properties={properties}
          units={units}
          onEdit={
            canEditExpense
              ? (expense) => {
                  setSelectedExpense(expense);
                  setShowExpenseModal(true);
                }
              : undefined
          }
          onDelete={
            canDeleteExpense
              ? (expense) => {
                  setSelectedExpense(expense);
                  setShowDeleteExpense(true);
                }
              : undefined
          }
        />
      </section>

      {(canCreateTransaction || canEditTransaction) && (
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
      )}

      {(canCreateExpense || canEditExpense) && (
        <ExpenseModal
          open={showExpenseModal}
          onClose={() => {
            setShowExpenseModal(false);
            setSelectedExpense(null);
          }}
          onSave={saveExpense}
          expense={selectedExpense}
          properties={properties}
          units={units}
        />
      )}

      {canDeleteTransaction && (
        <DeleteTransactionModal
          open={showDeleteTransaction}
          onClose={() => {
            setShowDeleteTransaction(false);
            setSelectedTransaction(null);
          }}
          onConfirm={confirmDeleteTransaction}
          transaction={selectedTransaction}
        />
      )}

      {canDeleteExpense && (
        <DeleteExpenseModal
          open={showDeleteExpense}
          onClose={() => {
            setShowDeleteExpense(false);
            setSelectedExpense(null);
          }}
          onConfirm={confirmDeleteExpense}
          expense={selectedExpense}
        />
      )}
    </div>
  );
}