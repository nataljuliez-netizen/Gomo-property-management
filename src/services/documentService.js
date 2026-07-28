// src/services/documentService.js

const STORAGE_KEY = "gomo_documents";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function getDocuments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveDocuments(documents) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
}

export function getAllDocuments() {
  return getDocuments();
}

export function validateDocumentFile(file) {
  if (!file) {
    return {
      valid: false,
      message: "Please select a file.",
    };
  }

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message:
        "Only PDF, JPG, PNG and WEBP files are allowed.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      message:
        "File size must not exceed 5 MB.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

export function addDocument(document) {
  const documents = getDocuments();

  const newDocument = {
    id: crypto.randomUUID(),

    documentName: document.documentName,
    documentType: document.documentType,

    relatedType: document.relatedType,
    relatedId: document.relatedId,
    relatedName: document.relatedName,

    fileName: document.fileName,
    fileType: document.fileType,
    fileSize: document.fileSize,
    fileData: document.fileData,

    notes: document.notes || "",

    uploadedAt: new Date().toISOString(),
  };

  documents.unshift(newDocument);

  saveDocuments(documents);

  return newDocument;
}

export function updateDocument(updatedDocument) {
  const documents = getDocuments();

  const updated = documents.map((document) =>
    document.id === updatedDocument.id
      ? {
          ...document,
          ...updatedDocument,
        }
      : document
  );

  saveDocuments(updated);

  return updatedDocument;
}

export function deleteDocument(id) {
  const documents = getDocuments().filter(
    (document) => document.id !== id
  );

  saveDocuments(documents);
}

export function getDocumentById(id) {
  return getDocuments().find(
    (document) => document.id === id
  );
}

export function clearDocuments() {
  localStorage.removeItem(STORAGE_KEY);
}