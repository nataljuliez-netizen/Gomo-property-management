// src/pages/Documents.jsx

import { useEffect, useState } from "react";

import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

import SearchBar from "../components/landlords/SearchBar";

import DocumentCards from "../components/Documents/DocumentCards";
import DocumentModal from "../components/Documents/DocumentModal";
import DeleteDocumentModal from "../components/Documents/DeleteDocumentModal";

import {
  getAllDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../services/documentService";

import { getAllTransactions } from "../services/transactionService";
import { getAllExpenses } from "../services/expenseService";

import { can } from "../services/permissionService";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  /* -------------------------------- */
  /* Permissions                      */
  /* -------------------------------- */

  const canCreate = can("document.create");
  const canEdit = can("document.edit");
  const canDelete = can("document.delete");

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setDocuments(getAllDocuments());
    setTransactions(getAllTransactions());
    setExpenses(getAllExpenses());
  }

  function handleSave(document) {
    if (selectedDocument) {
      if (!canEdit) return;

      updateDocument(document);
    } else {
      if (!canCreate) return;

      addDocument(document);
    }

    loadData();

    setShowModal(false);
    setSelectedDocument(null);
  }

  function handleDelete() {
    if (!canDelete) return;

    if (!selectedDocument) return;

    deleteDocument(selectedDocument.id);

    loadData();

    setShowDeleteModal(false);
    setSelectedDocument(null);
  }

  const filteredDocuments = documents.filter(
    (document) => {
      const text = search.toLowerCase();

      return (
        document.documentName
          ?.toLowerCase()
          .includes(text) ||
        document.documentType
          ?.toLowerCase()
          .includes(text) ||
        document.relatedName
          ?.toLowerCase()
          .includes(text) ||
        document.fileName
          ?.toLowerCase()
          .includes(text)
      );
    }
  );

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