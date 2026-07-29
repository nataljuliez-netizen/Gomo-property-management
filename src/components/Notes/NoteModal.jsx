// src/components/Notes/NoteModal.jsx

import Modal from "../common/Modal";
import NoteForm from "./NoteForm";

export default function NoteModal({
  open,
  onClose,
  note,
  properties,
  tenants,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={note ? "Edit Note" : "Add Note"}
      size="lg"
    >
      <NoteForm
        note={note}
        properties={properties}
        tenants={tenants}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}