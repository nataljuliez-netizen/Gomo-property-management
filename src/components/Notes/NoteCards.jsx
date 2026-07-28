// src/components/Notes/NoteCards.jsx

import { Card, Badge, EmptyState } from "../common";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Home,
  Trash2,
} from "lucide-react";

function getDueStatus(dueDate) {
  if (!dueDate) {
    return {
      label: "No Due Date",
      color: "bg-gray-100 text-gray-700",
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diff = Math.ceil(
    (due - today) / (1000 * 60 * 60 * 24)
  );

  if (diff < 0) {
    return {
      label: "Overdue",
      color: "bg-red-100 text-red-700",
    };
  }

  if (diff === 0) {
    return {
      label: "Due Today",
      color: "bg-orange-100 text-orange-700",
    };
  }

  if (diff === 1) {
    return {
      label: "Tomorrow",
      color: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    label: `${diff} Days Left`,
    color: "bg-green-100 text-green-700",
  };
}

function priorityClasses(priority) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    case "Low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function statusClasses(status) {
  return status === "Completed"
    ? "success"
    : "warning";
}

export default function NoteCards({
  notes,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  if (!notes.length) {
    return (
      <EmptyState
        title="No Notes Found"
        description="Create your first reminder or task."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => {
        const due = getDueStatus(note.dueDate);

        return (
          <Card
            key={note.id}
            className={
              note.status === "Completed"
                ? "opacity-70"
                : ""
            }
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    {note.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {note.category}
                  </p>
                </div>

                <Badge
                  variant={statusClasses(
                    note.status
                  )}
                >
                  {note.status}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${priorityClasses(
                    note.priority
                  )}`}
                >
                  {note.priority}
                </span>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${due.color}`}
                >
                  {due.label}
                </span>
              </div>

              {note.propertyName && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Home size={16} />

                  <span>{note.propertyName}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />

                <span>{note.dueDate}</span>
              </div>

              {note.description && (
                <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                  {note.description}
                </div>
              )}

              {(onToggleStatus ||
                onEdit ||
                onDelete) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {onToggleStatus && (
                    <button
                      onClick={() =>
                        onToggleStatus(
                          note.id
                        )
                      }
                      className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700"
                    >
                      {note.status ===
                      "Completed" ? (
                        <>
                          <Clock size={16} />
                          Mark Pending
                        </>
                      ) : (
                        <>
                          <CheckCircle2
                            size={16}
                          />
                          Complete
                        </>
                      )}
                    </button>
                  )}

                  {onEdit && (
                    <button
                      onClick={() =>
                        onEdit(note)
                      }
                      className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() =>
                        onDelete(note)
                      }
                      className="flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
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