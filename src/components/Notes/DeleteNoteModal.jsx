// src/components/Notes/DeleteNoteModal.jsx

import Modal from "../common/Modal";

export default function DeleteNoteModal({
  open,
  onClose,
  note,
  onDelete,
}) {
  if (!open || !note) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Reminder"
    >
      <div className="space-y-6">
        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            "{note.title}"
          </span>
          ?
        </p>

        <p className="text-sm text-red-600">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onDelete(note.id)}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}