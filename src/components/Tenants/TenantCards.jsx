import {
  Card,
  Button,
  EmptyState,
} from "../common";

export default function TenantCards({
  tenants,
  units,
  onEdit,
  onDelete,
}) {
  if (tenants.length === 0) {
    return (
      <EmptyState
        title="No Tenants Found"
        description="Add your first tenant to get started."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tenants.map((tenant) => {
        const unit =
          units.find(
            (u) => u.id === tenant.unitId
          ) || {};

        return (
          <Card key={tenant.id}>
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold">
                  {tenant.fullName}
                </h3>

                <p className="text-sm text-slate-500">
                  {tenant.email}
                </p>
              </div>

              <div className="space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Phone:</strong>{" "}
                  {tenant.phone || "-"}
                </p>

                <p>
                  <strong>ID / Passport:</strong>{" "}
                  {tenant.idNumber || "-"}
                </p>

                <p>
                  <strong>Unit:</strong>{" "}
                  {unit.unitNumber
                    ? `Unit ${unit.unitNumber}`
                    : "-"}
                </p>

                <p>
                  <strong>Move-in Date:</strong>{" "}
                  {tenant.moveInDate || "-"}
                </p>

                {tenant.notes && (
                  <p>
                    <strong>Notes:</strong>{" "}
                    {tenant.notes}
                  </p>
                )}
              </div>

              {(onEdit || onDelete) && (
                <div className="flex gap-2 pt-3">
                  {onEdit && (
                    <Button
                      onClick={() =>
                        onEdit(tenant)
                      }
                    >
                      Edit
                    </Button>
                  )}

                  {onDelete && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        onDelete(tenant.id)
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