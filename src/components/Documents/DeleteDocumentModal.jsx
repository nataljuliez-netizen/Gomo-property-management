// src/components/Documents/DeleteDocumentModal.jsx

import Modal from "../common/Modal";
import Button from "../common/Button";

export default function DeleteDocumentModal({
  open,
  onClose,
  onConfirm,
  document,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Document"
    >
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to permanently delete this document?
        </p>

        {document && (
          <div className="rounded-lg border bg-gray-50 p-4 space-y-2">
            <p>
              <strong>Document:</strong>{" "}
              {document.documentName}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {document.documentType}
            </p>

            <p>
              <strong>Related To:</strong>{" "}
              {document.relatedType}
            </p>

            <p>
              <strong>Record:</strong>{" "}
              {document.relatedName}
            </p>

            <p>
              <strong>File:</strong>{" "}
              {document.fileName}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}