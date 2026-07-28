// src/components/Documents/DocumentCards.jsx

import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

export default function DocumentCards({
  documents,
  onEdit,
  onDelete,
}) {
  if (documents.length === 0) {
    return (
      <EmptyState
        title="No Documents"
        description="Upload your first receipt or proof of payment."
      />
    );
  }

  function openDocument(doc) {
    try {
      if (!doc.fileData) {
        alert("Document could not be opened.");
        return;
      }

      if (doc.fileType?.startsWith("image/")) {
        window.open(doc.fileData, "_blank");
        return;
      }

      if (doc.fileType === "application/pdf") {
        const base64 = doc.fileData.split(",")[1];

        const byteCharacters = atob(base64);
        const byteNumbers = new Array(
          byteCharacters.length
        );

        for (
          let i = 0;
          i < byteCharacters.length;
          i++
        ) {
          byteNumbers[i] =
            byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(
          byteNumbers
        );

        const blob = new Blob([byteArray], {
          type: "application/pdf",
        });

        const url =
          URL.createObjectURL(blob);

        window.open(url, "_blank");

        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 10000);

        return;
      }

      window.open(doc.fileData, "_blank");
    } catch (error) {
      console.error(error);
      alert("Unable to preview this document.");
    }
  }

  function downloadDocument(doc) {
    try {
      const link =
        window.document.createElement("a");

      link.href = doc.fileData;
      link.download = doc.fileName;

      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      alert("Unable to download this document.");
    }
  }

  function formatFileSize(bytes) {
    if (!bytes) return "";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id}>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {doc.documentName}
                </h3>

                <p className="text-sm text-gray-500">
                  {new Date(
                    doc.uploadedAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <Badge>
                {doc.documentType}
              </Badge>
            </div>

            <div className="overflow-hidden rounded-lg border bg-gray-50">
              {doc.fileType?.startsWith(
                "image/"
              ) ? (
                <img
                  src={doc.fileData}
                  alt={doc.documentName}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center text-center">
                  <div className="text-5xl">
                    📄
                  </div>

                  <p className="mt-3 font-medium">
                    PDF Document
                  </p>

                  <p className="text-sm text-gray-500">
                    Click Preview to open
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Related To:</strong>{" "}
                {doc.relatedType}
              </p>

              <p>
                <strong>Record:</strong>{" "}
                {doc.relatedName}
              </p>

              <p className="break-all">
                <strong>File:</strong>{" "}
                {doc.fileName}
              </p>

              {doc.fileSize > 0 && (
                <p>
                  <strong>Size:</strong>{" "}
                  {formatFileSize(
                    doc.fileSize
                  )}
                </p>
              )}

              {doc.notes && (
                <>
                  <hr />

                  <div>
                    <strong>Notes</strong>

                    <p className="mt-1 whitespace-pre-wrap text-gray-600">
                      {doc.notes}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div
              className={`grid gap-2 ${
                onEdit || onDelete
                  ? "grid-cols-2"
                  : "grid-cols-2"
              }`}
            >
              <Button
                onClick={() =>
                  openDocument(doc)
                }
              >
                Preview
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  downloadDocument(doc)
                }
              >
                Download
              </Button>

              {onEdit && (
                <Button
                  onClick={() =>
                    onEdit(doc)
                  }
                >
                  Edit
                </Button>
              )}

              {onDelete && (
                <Button
                  variant="danger"
                  onClick={() =>
                    onDelete(doc)
                  }
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}