// src/pages/Notes.jsx

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import PageHeader from "../components/common/PageHeader";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";

import NoteCards from "../components/Notes/NoteCards";
import NoteModal from "../components/Notes/NoteModal";
import DeleteNoteModal from "../components/Notes/DeleteNoteModal";

import { useNotes } from "../hooks/useNotes";
import {
  useAddNote,
  useUpdateNote,
  useDeleteNote,
} from "../hooks/useNotes";

import { useProperties } from "../hooks/useProperties";
import { useTenants } from "../hooks/useTenants";

import { can } from "../services/permissionService";

export default function Notes() {
  const { notes } = useNotes();
  const { properties } = useProperties();
  const { tenants } = useTenants();

  const addMutation = useAddNote();
  const updateMutation = useUpdateNote();
  const deleteMutation = useDeleteNote();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showModal, setShowModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedNote, setSelectedNote] =
    useState(null);

  const canCreate = can("note.create");
  const canEdit = can("note.edit");
  const canDelete = can("note.delete");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const property =
        properties.find(
          (p) => p.id === note.propertyId
        ) || {};

      const matchesSearch =
        (note.title || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (note.content || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (property.name || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        note.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    notes,
    properties,
    search,
    statusFilter,
  ]);

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

async function handleSubmit(data) {
  try {
    console.log("Submitting:", data);

    if (selectedNote) {
      await updateMutation.mutateAsync({
        ...data,
        id: selectedNote.id,
      });
    } else {
      await addMutation.mutateAsync(data);
    }

    console.log("Saved successfully!");

    setShowModal(false);
    setSelectedNote(null);
  } catch (err) {
    console.error("Save failed:", err);
    alert(err.message);
  }
}

  function handleDelete(note) {
    setSelectedNote(note);
    setShowDeleteModal(true);
  }

  async function confirmDelete(id) {
    await deleteMutation.mutateAsync(id);

    setShowDeleteModal(false);
    setSelectedNote(null);
  }

  async function handleToggle(note) {
    await updateMutation.mutateAsync({
      ...note,
      status:
        note.status === "Completed"
          ? "Pending"
          : "Completed",
    });
  }
  console.log("Notes:", notes);
console.log("Properties:", properties);
console.log("Tenants:", tenants);

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
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <NoteCards
        notes={filteredNotes}
        properties={properties}
        tenants={tenants}
        onEdit={canEdit ? handleEdit : undefined}
        onDelete={canDelete ? handleDelete : undefined}
        onToggleStatus={canEdit ? handleToggle : undefined}
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
          tenants={tenants}
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