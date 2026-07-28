// src/components/Expenses/DeleteExpenseModal.jsx

import Modal from "../common/Modal";
import Button from "../common/Button";

export default function DeleteExpenseModal({
  open,
  onClose,
  onConfirm,
  expense,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Expense"
    >
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to delete this expense?
        </p>

        {expense && (
          <div className="rounded-lg border bg-gray-50 p-4 space-y-2">
            <p>
              <strong>Expense:</strong>{" "}
              {expense.expenseName}
            </p>

            <p>
              <strong>Property:</strong>{" "}
              {expense.propertyName || "General Expense"}
            </p>

            <p>
              <strong>Amount:</strong>{" "}
              R{" "}
              {Number(expense.amount).toLocaleString()}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {expense.expenseDate}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}