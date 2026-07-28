import { Badge, Button, Card, EmptyState } from "../common";

export default function PropertyCards({
  properties,
  landlords,
  onEdit,
  onDelete,
}) {
  if (properties.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        description="Click 'Add Property' to create your first property."
      />
    );
  }

  function getLandlordName(id) {
    const landlord = landlords.find(
      (l) => l.id === id
    );

    return landlord ? landlord.name : "-";
  }

  return (
    <div className="mt-4 space-y-4">
      {properties.map((property) => (
        <Card key={property.id}>
          <h2 className="text-xl font-semibold">
            {property.name}
          </h2>

          <p className="text-slate-600">
            {property.address}
          </p>

          <p>
            <strong>Type:</strong> {property.type}
          </p>

          <p>
            <strong>Landlord:</strong>{" "}
            {getLandlordName(property.landlordId)}
          </p>

          <div className="mt-3">
            <Badge
              color={
                property.status === "Active"
                  ? "green"
                  : "red"
              }
            >
              {property.status}
            </Badge>
          </div>

          {(onEdit || onDelete) && (
            <div className="mt-4 flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  onClick={() => onEdit(property)}
                >
                  Edit
                </Button>
              )}

              {onDelete && (
                <Button
                  variant="danger"
                  onClick={() =>
                    onDelete(property.id)
                  }
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}