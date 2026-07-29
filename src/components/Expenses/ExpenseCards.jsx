import {
  Card,
  Button,
  EmptyState,
} from "../common";

export default function ExpenseCards({
  expenses,
  properties,
  units,
  onEdit,
  onDelete,
}) {
  if (expenses.length === 0) {
    return (
      <EmptyState
        title="No Expenses Found"
        description="Record your first expense."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {expenses.map((expense) => {
        const property =
          properties.find(
            (p) => p.id === expense.propertyId
          ) || {};

        const unit =
          units.find(
            (u) => u.id === expense.unitId
          ) || {};

        return (
          <Card key={expense.id}>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">
                  {expense.category}
                </h3>

                <p className="text-sm text-slate-500">
                  {property.name || "-"}
                </p>
              </div>

              <div className="space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Vendor:</strong>{" "}
                  {expense.vendor || "-"}
                </p>

                <p>
                  <strong>Unit:</strong>{" "}
                  {unit.unitNumber
                    ? `Unit ${unit.unitNumber}`
                    : "-"}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  {expense.amount != null
                    ? `R ${Number(
                        expense.amount
                      ).toLocaleString()}`
                    : "-"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {expense.expenseDate || "-"}
                </p>

                {expense.description && (
                  <p>
                    <strong>Description:</strong>{" "}
                    {expense.description}
                  </p>
                )}
              </div>

              {(onEdit || onDelete) && (
                <div className="flex gap-2 pt-3">
                  {onEdit && (
                    <Button
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
        );
      })}
    </div>
  );
}