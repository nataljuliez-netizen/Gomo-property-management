import { Card, Badge, EmptyState } from "../common";
import {
  Calendar,
  Clock,
  PlusCircle,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

function getBadgeVariant(action) {
  switch (action) {
    case "Created":
      return "success";

    case "Updated":
      return "warning";

    case "Deleted":
      return "danger";

    default:
      return "default";
  }
}

function getIcon(action) {
  switch (action) {
    case "Created":
      return <PlusCircle size={18} />;

    case "Updated":
      return <Pencil size={18} />;

    case "Deleted":
      return <Trash2 size={18} />;

    default:
      return <FileText size={18} />;
  }
}

export default function AuditCards({ logs }) {
  if (!logs.length) {
    return (
      <EmptyState
        title="No Activity Yet"
        description="Actions performed in GOMO will appear here."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {logs.map((log) => {
        const date = new Date(log.createdAt);

        return (
          <Card key={log.id}>

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

              <div className="flex gap-4">

                <div className="mt-1 rounded-full bg-gray-100 p-2">
                  {getIcon(log.action)}
                </div>

                <div className="space-y-2">

                  <div className="flex items-center gap-2">
                    <Badge variant={getBadgeVariant(log.action)}>
                      {log.action}
                    </Badge>
                  </div>

                  <p className="text-gray-800">
                    {log.changes?.description || "No description"}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">

                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {date.toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {date.toLocaleTimeString()}
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </Card>
        );
      })}
    </div>
  );
}
