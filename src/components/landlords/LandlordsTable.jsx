import {
  Badge,
  Button,
  Card,
  EmptyState,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../common";

export default function LandlordsTable({
  landlords,
  onEdit,
  onDelete,
}) {
  if (landlords.length === 0) {
    return (
      <EmptyState
        title="No landlords found"
        description="Click 'Add Landlord' to create your first landlord."
      />
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Bank</TableHeader>
            <TableHeader>Status</TableHeader>

            {(onEdit || onDelete) && (
              <TableHeader>Actions</TableHeader>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {landlords.map((landlord) => (
            <TableRow key={landlord.id}>
              <TableCell>{landlord.name}</TableCell>

              <TableCell>{landlord.phone}</TableCell>

              <TableCell>{landlord.email}</TableCell>

              <TableCell>
                {landlord.bankName || "-"}
              </TableCell>

              <TableCell>
                <Badge
                  color={
                    landlord.status === "Active"
                      ? "green"
                      : "red"
                  }
                >
                  {landlord.status}
                </Badge>
              </TableCell>

              {(onEdit || onDelete) && (
                <TableCell>
                  <div className="flex gap-2">
                    {onEdit && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          onEdit(landlord)
                        }
                      >
                        Edit
                      </Button>
                    )}

                    {onDelete && (
                      <Button
                        variant="danger"
                        onClick={() =>
                          onDelete(landlord.id)
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}