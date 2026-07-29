import {
  Card,
  Button,
  EmptyState,
} from "../common";

export default function TransactionCards({
  transactions,
  tenants,
  properties,
  units,
  onEdit,
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No Transactions Found"
        description="Record your first rent payment."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {transactions.map((transaction) => {
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

        return (
          <Card key={transaction.id}>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">
                  {tenant.firstName}{" "}
                  {tenant.lastName}
                </h3>

                <p className="text-sm text-slate-500">
                  {property.name || "-"}
                </p>
              </div>

              <div className="space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Unit:</strong>{" "}
                  {unit.unitNumber
                    ? `Unit ${unit.unitNumber}`
                    : "-"}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {transaction.category}
                </p>

                <p>
                  <strong>Type:</strong>{" "}
                  {transaction.type}
                </p>

                <p>
                  <strong>Amount:</strong>{" "}
                  {transaction.amount != null
                    ? `R ${Number(
                        transaction.amount
                      ).toLocaleString()}`
                    : "-"}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {transaction.transactionDate ||
                    "-"}
                </p>

                {transaction.description && (
                  <p>
                    <strong>Description:</strong>{" "}
                    {transaction.description}
                  </p>
                )}
              </div>

              {(onEdit || onDelete) && (
                <div className="flex gap-2 pt-3">
                  {onEdit && (
                    <Button
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
        );
      })}
    </div>
  );
}