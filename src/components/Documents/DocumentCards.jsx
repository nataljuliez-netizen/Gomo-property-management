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
  console.log("Documents:", JSON.stringify(documents, null, 2));

  if (documents.length === 0) {
    return (
      <EmptyState
        title="No Documents"
        description="Upload your first receipt or proof of payment."
      />
    );
  }

  function openDocument(doc) {
    console.log("Opening document:", doc);

    if (!doc.fileUrl || doc.fileUrl.trim() === "") {
      console.error("Missing fileUrl:", doc);
      alert("Document could not be opened.");
      return;
    }

    window.open(doc.fileUrl, "_blank");
  }

  function downloadDocument(doc) {
    console.log("Downloading document:", doc);

    if (!doc.fileUrl || doc.fileUrl.trim() === "") {
      console.error("Missing fileUrl:", doc);
      alert("Document could not be downloaded.");
      return;
    }

    const link = document.createElement("a");
    link.href = doc.fileUrl;
    link.download = doc.fileName || "document";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function formatFileSize(bytes) {
    if (!bytes) return "";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((doc) => {
        console.log("Document Card:", JSON.stringify(doc, null, 2));

        return (
          <Card key={doc.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {doc.documentName}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {doc.uploadedAt
                      ? new Date(doc.uploadedAt).toLocaleDateString()
                      : ""}
                  </p>
                </div>

                <Badge>{doc.documentType}</Badge>
              </div>

              <div className="overflow-hidden rounded-lg border bg-gray-50">
                {doc.fileType?.startsWith("image/") ? (
                  <img
                    src={doc.fileUrl}
                    alt={doc.documentName}
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center text-center">
                    <div className="text-5xl">📄</div>

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

                {doc.fileUrl && (
                  <p className="break-all text-xs text-blue-600">
                    {doc.fileUrl}
                  </p>
                )}

                {doc.fileSize > 0 && (
                  <p>
                    <strong>Size:</strong>{" "}
                    {formatFileSize(doc.fileSize)}
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

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={() => openDocument(doc)}>
                  Preview
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => downloadDocument(doc)}
                >
                  Download
                </Button>

                {onEdit && (
                  <Button onClick={() => onEdit(doc)}>
                    Edit
                  </Button>
                )}

                {onDelete && (
                  <Button
                    variant="danger"
                    onClick={() => onDelete(doc)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}