// src/components/Transactions/TransactionCards.jsx

import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

function getStatusVariant(status) {
  switch (status) {
    case "Paid":
      return "success";

    case "Partially Paid":
      return "warning";

    case "Due":
      return "danger";

    default:
      return "default";
  }
}

export default function TransactionCards({
  transactions,
  onEdit,
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No Rental Transactions"
        description="Click 'Record Rent' to add your first rental payment."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {transaction.tenantName}
                </h3>

                <p className="text-sm text-gray-500">
                  {transaction.billingPeriod}
                </p>
              </div>

              <Badge
                variant={getStatusVariant(
                  transaction.status
                )}
              >
                {transaction.status}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Property:</strong>{" "}
                {transaction.propertyName}
              </p>

              <p>
                <strong>Unit:</strong>{" "}
                {transaction.unitNumber}
              </p>

              <hr />

              <p>
                <strong>Rent Payable:</strong>{" "}
                R{" "}
                {Number(
                  transaction.rentPayable
                ).toLocaleString()}
              </p>

              <p>
                <strong>Rent Paid:</strong>{" "}
                R{" "}
                {Number(
                  transaction.rentPaid
                ).toLocaleString()}
              </p>

              <p className="font-semibold text-red-600">
                Rent Due: R{" "}
                {Number(
                  transaction.rentDue
                ).toLocaleString()}
              </p>

              <hr />

              <p>
                <strong>Due Date:</strong>{" "}
                {transaction.dueDate}
              </p>

              <p>
                <strong>Payment Date:</strong>{" "}
                {transaction.paymentDate || "-"}
              </p>

              {transaction.notes && (
                <>
                  <hr />

                  <div>
                    <strong>Notes</strong>

                    <p className="mt-1 text-gray-600">
                      {transaction.notes}
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
                      onEdit(transaction)
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
                      onDelete(transaction)
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