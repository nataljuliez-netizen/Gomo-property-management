import {
  Card,
  Button,
  Badge,
  EmptyState,
} from "../common";

export default function UnitCards({
  units,
  properties,
  onEdit,
  onDelete,
}) {
  if (units.length === 0) {
    return (
      <EmptyState
        title="No Units Found"
        description="Add your first unit to get started."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {units.map((unit) => {
        const property =
          properties.find(
            (p) => p.id === unit.propertyId
          ) || {};

        return (
          <Card key={unit.id}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Unit {unit.unitNumber}
                </h3>

                <Badge>
                  {unit.status}
                </Badge>
              </div>

              <div className="space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Property:</strong>{" "}
                  {property.name || "-"}
                </p>

                <p>
                  <strong>Bedrooms:</strong>{" "}
                  {unit.bedrooms}
                </p>

                <p>
                  <strong>Bathrooms:</strong>{" "}
                  {unit.bathrooms}
                </p>

                <p>
                  <strong>Monthly Rent:</strong>{" "}
                  R{" "}
                  {Number(
                    unit.rent || 0
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>Deposit:</strong>{" "}
                  R{" "}
                  {Number(
                    unit.deposit || 0
                  ).toLocaleString()}
                </p>

                {unit.notes && (
                  <p>
                    <strong>Notes:</strong>{" "}
                    {unit.notes}
                  </p>
                )}
              </div>

              {(onEdit || onDelete) && (
                <div className="flex gap-2 pt-3">
                  {onEdit && (
                    <Button
                      onClick={() =>
                        onEdit(unit)
                      }
                    >
                      Edit
                    </Button>
                  )}

                  {onDelete && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        onDelete(unit.id)
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