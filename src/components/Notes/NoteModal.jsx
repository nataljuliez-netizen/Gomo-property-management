// src/components/Notes/NoteModal.jsx

import Modal from "../common/Modal";
import NoteForm from "./NoteForm";

export default function NoteModal({
  open,
  onClose,
  note,
  properties,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        note
          ? "Edit Reminder"
          : "Add Reminder"
      }
    >
      <NoteForm
        note={note}
        properties={properties}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}