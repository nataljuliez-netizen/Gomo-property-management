// src/components/Expenses/ExpenseModal.jsx

import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import ExpenseForm from "./ExpenseForm";

const emptyExpense = {
  expenseName: "",
  propertyId: "",
  propertyName: "",
  amount: "",
  expenseDate: "",
  notes: "",
};

export default function ExpenseModal({
  open,
  onClose,
  onSave,
  expense,
  properties,
}) {
  const [currentExpense, setCurrentExpense] =
    useState(emptyExpense);

  useEffect(() => {
    if (expense) {
      setCurrentExpense(expense);
    } else {
      setCurrentExpense(emptyExpense);
    }
  }, [expense, open]);

  function handleSubmit(data) {
    if (expense) {
      onSave({
        ...expense,
        ...data,
      });
    } else {
      onSave(data);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        expense
          ? "Edit Expense"
          : "Record Expense"
      }
    >
      <ExpenseForm
        expense={currentExpense}
        properties={properties}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}