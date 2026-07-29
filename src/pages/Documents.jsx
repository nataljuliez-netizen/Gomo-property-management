import { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

import SearchBar from "../components/landlords/SearchBar";

import DocumentCards from "../components/Documents/DocumentCards";
import DocumentModal from "../components/Documents/DocumentModal";
import DeleteDocumentModal from "../components/Documents/DeleteDocumentModal";

import {
  useDocuments,
  useAddDocument,
  useUpdateDocument,
  useDeleteDocument,
} from "../hooks/useDocuments";

import { useTransactions } from "../hooks/useTransactions";
import { useExpenses } from "../hooks/useExpenses";
import { useTenants } from "../hooks/useTenants";
import { useProperties } from "../hooks/useProperties";
import { useUnits } from "../hooks/useUnits";

import { can } from "../services/permissionService";

export default function Documents() {
  const {
    documents = [],
    loading,
    error,
  } = useDocuments();

  const { transactions = [] } = useTransactions();
  const { expenses = [] } = useExpenses();

  const { tenants = [] } = useTenants();
  const { properties = [] } = useProperties();
  const { units = [] } = useUnits();

  const addDocument = useAddDocument();
  const updateDocument = useUpdateDocument();
  const removeDocument = useDeleteDocument();

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const canCreate = can("document.create");
  const canEdit = can("document.edit");
  const canDelete = can("document.delete");

  async function handleSave(document) {
    if (selectedDocument) {
      if (!canEdit) return;

      await updateDocument.mutateAsync(document);
    } else {
      if (!canCreate) return;

      await addDocument.mutateAsync(document);
    }

    setShowModal(false);
    setSelectedDocument(null);
  }

  async function handleDelete() {
    if (!canDelete) return;
    if (!selectedDocument) return;

    await removeDocument.mutateAsync(selectedDocument.id);

    setShowDeleteModal(false);
    setSelectedDocument(null);
  }

  const filteredDocuments = documents.filter((document) => {
    const text = search.toLowerCase();

    return (
      document.documentName?.toLowerCase().includes(text) ||
      document.documentType?.toLowerCase().includes(text) ||
      document.relatedName?.toLowerCase().includes(text) ||
      document.fileName?.toLowerCase().includes(text)
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        Loading documents...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Failed to load documents.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        subtitle="Manage receipts, invoices and proof of payments."
      >
        {canCreate && (
          <Button
            onClick={() => {
              setSelectedDocument(null);
              setShowModal(true);
            }}
          >
            + Upload Document
          </Button>
        )}
      </PageHeader>

      <Card>
        <SearchBar
          search={search}
          setSearch={setSearch}
        />
      </Card>

      <DocumentCards
        documents={filteredDocuments}
        onEdit={
          canEdit
            ? (document) => {
                setSelectedDocument(document);
                setShowModal(true);
              }
            : undefined
        }
        onDelete={
          canDelete
            ? (document) => {
                setSelectedDocument(document);
                setShowDeleteModal(true);
              }
            : undefined
        }
      />

      {(canCreate || canEdit) && (
        <DocumentModal
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedDocument(null);
          }}
          onSave={handleSave}
          document={selectedDocument}
          transactions={transactions}
          expenses={expenses}
          tenants={tenants}
          properties={properties}
          units={units}
        />
      )}

      {canDelete && (
        <DeleteDocumentModal
          open={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedDocument(null);
          }}
          onConfirm={handleDelete}
          document={selectedDocument}
        />
      )}
    </div>
  );
}