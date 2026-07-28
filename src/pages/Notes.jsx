// src/pages/Notes.jsx

import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";

import NoteCards from "../components/Notes/NoteCards";
import NoteModal from "../components/Notes/NoteModal";
import DeleteNoteModal from "../components/Notes/DeleteNoteModal";

import {
  getAllNotes,
  addNote,
  updateNote,
  deleteNote,
  toggleNoteStatus,
} from "../services/noteService";

import { getProperties } from "../services/propertyService";

import { can } from "../services/permissionService";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [properties, setProperties] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedNote, setSelectedNote] =
    useState(null);

  /* -------------------------------- */
  /* Permissions                      */
  /* -------------------------------- */

  const canCreate = can("note.create");
  const canEdit = can("note.edit");
  const canDelete = can("note.delete");

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setNotes(getAllNotes());
    setProperties(getProperties());
  }

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        note.category
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (note.propertyName || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        note.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [notes, search, statusFilter]);

  function handleAdd() {
    if (!canCreate) return;

    setSelectedNote(null);
    setShowModal(true);
  }

  function handleEdit(note) {
    if (!canEdit) return;

    setSelectedNote(note);
    setShowModal(true);
  }

  function handleSubmit(data) {
    if (selectedNote) {
      if (!canEdit) return;

      updateNote(data);
    } else {
      if (!canCreate) return;

      addNote(data);
    }

    setShowModal(false);
    setSelectedNote(null);
    loadData();
  }

  function handleDelete(note) {
    if (!canDelete) return;

    setSelectedNote(note);
    setShowDeleteModal(true);
  }

  function confirmDelete(id) {
    if (!canDelete) return;

    deleteNote(id);

    setShowDeleteModal(false);
    setSelectedNote(null);
    loadData();
  }

  function handleToggle(id) {
    if (!canEdit) return;

    toggleNoteStatus(id);
    loadData();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="Notes"
          subtitle="Manage reminders, follow-ups and important tasks."
        />

        {canCreate && (
          <Button onClick={handleAdd}>
            <Plus size={18} />
            Add Note
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <SearchInput
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search notes..."
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-lg border px-3 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <NoteCards
        notes={filteredNotes}
        onEdit={
          canEdit ? handleEdit : undefined
        }
        onDelete={
          canDelete
            ? handleDelete
            : undefined
        }
        onToggleStatus={
          canEdit
            ? handleToggle
            : undefined
        }
      />

      {(canCreate || canEdit) && (
        <NoteModal
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedNote(null);
          }}
          note={selectedNote}
          properties={properties}
          onSubmit={handleSubmit}
        />
      )}

      {canDelete && (
        <DeleteNoteModal
          open={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedNote(null);
          }}
          note={selectedNote}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}