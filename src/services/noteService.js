// src/services/noteService.js

import { addAuditLog } from "./auditService";
import { notifyDashboard } from "./dashboardEvents";

const STORAGE_KEY = "gomo_notes";

function getNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notes)
  );
}

export function getAllNotes() {
  return getNotes().sort((a, b) => {
    // Pending first
    if (a.status !== b.status) {
      return a.status === "Pending" ? -1 : 1;
    }

    // High priority first
    const priorityOrder = {
      High: 0,
      Medium: 1,
      Low: 2,
    };

    return (
      priorityOrder[a.priority] -
      priorityOrder[b.priority]
    );
  });
}

export function addNote(note) {
  const notes = getNotes();

  const newNote = {
    id: crypto.randomUUID(),

    title: note.title,

    category: note.category,

    propertyId: note.propertyId || "",

    propertyName: note.propertyName || "",

    dueDate: note.dueDate,

    priority: note.priority,

    status: "Pending",

    description: note.description || "",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  notes.unshift(newNote);

  saveNotes(notes);
  notifyDashboard();

  addAuditLog(
    "Created",
    `Created note "${note.title}"`
  );

  return newNote;
}

export function updateNote(updatedNote) {
  const notes = getNotes();

  const updated = notes.map((note) =>
    note.id === updatedNote.id
      ? {
          ...updatedNote,
          updatedAt: new Date().toISOString(),
        }
      : note
  );

  saveNotes(updated);
  notifyDashboard();

  addAuditLog(
    "Updated",
    `Updated note "${updatedNote.title}"`
  );
}

export function deleteNote(id) {
  const notes = getNotes();

  const note = notes.find(
    (n) => n.id === id
  );

  const updated = notes.filter(
    (n) => n.id !== id
  );

  saveNotes(updated);
  notifyDashboard();

  if (note) {
    addAuditLog(
      "Deleted",
      `Deleted note "${note.title}"`
    );
  }
}

export function toggleNoteStatus(id) {
  const notes = getNotes();

  const updated = notes.map((note) => {
    if (note.id !== id) return note;

    const newStatus =
      note.status === "Pending"
        ? "Completed"
        : "Pending";

    addAuditLog(
      "Updated",
      `${newStatus} note "${note.title}"`
    );

    return {
      ...note,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
  });

  saveNotes(updated);
  notifyDashboard();
}