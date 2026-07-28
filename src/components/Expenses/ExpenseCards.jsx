// src/components/Expenses/ExpenseCards.jsx

import Card from "../common/Card";
import Button from "../common/Button";
import EmptyState from "../common/EmptyState";

export default function ExpenseCards({
  expenses,
  onEdit,
  onDelete,
}) {
  if (expenses.length === 0) {
    return (
      <EmptyState
        title="No Expenses"
        description="Click 'Record Expense' to add your first expense."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {expenses.map((expense) => (
        <Card key={expense.id}>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">
                {expense.expenseName}
              </h3>

              <p className="text-sm text-gray-500">
                {expense.expenseDate}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Property:</strong>{" "}
                {expense.propertyName ||
                  "General Expense"}
              </p>

              <p className="text-lg font-bold text-red-600">
                Amount: R{" "}
                {Number(
                  expense.amount
                ).toLocaleString()}
              </p>

              {expense.notes && (
                <>
                  <hr />

                  <div>
                    <strong>Notes</strong>

                    <p className="mt-1 text-gray-600">
                      {expense.notes}
                    </p>
                  </div>
                </>
              )}
            </div>

            {(onEdit || onDelete) && (
              <div className="flex gap-2 pt-2">
                {onEdit && (
                  <Button
                    className="flex-1"
                    onClick={() =>
                      onEdit(expense)
                    }
                  >
                    Edit
                  </Button>
                )}

                {onDelete && (
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={() =>
                      onDelete(expense)
                    }
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}