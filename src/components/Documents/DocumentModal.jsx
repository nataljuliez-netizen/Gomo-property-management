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
  fileSize: 0,
  fileUrl: "",
  notes: "",
};

export default function DocumentModal({
  open,
  onClose,
  onSave,
  document,
  transactions,
  expenses,
  tenants,
  properties,
  units,
}) {
  const [currentDocument, setCurrentDocument] = useState(emptyDocument);

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
      title={document ? "Edit Document" : "Upload Document"}
    >
      <DocumentForm
        document={currentDocument}
        transactions={transactions}
        expenses={expenses}
        tenants={tenants}
        properties={properties}
        units={units}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}