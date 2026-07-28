// src/components/Documents/DocumentModal.jsx

import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import DocumentForm from "./DocumentForm";

const emptyDocument = {
  documentName: "",
  documentType: "Receipt",
  relatedType: "Rental Income",
  relatedId: "",
  relatedName: "",
  fileName: "",
  fileType: "",
  fileData: "",
  notes: "",
};

export default function DocumentModal({
  open,
  onClose,
  onSave,
  document,
  transactions,
  expenses,
}) {
  const [currentDocument, setCurrentDocument] =
    useState(emptyDocument);

  useEffect(() => {
    if (document) {
      setCurrentDocument(document);
    } else {
      setCurrentDocument(emptyDocument);
    }
  }, [document, open]);

  function handleSubmit(data) {
    if (document) {
      onSave({
        ...document,
        ...data,
      });
    } else {
      onSave(data);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        document
          ? "Edit Document"
          : "Upload Document"
      }
    >
      <DocumentForm
        document={currentDocument}
        transactions={transactions}
        expenses={expenses}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}