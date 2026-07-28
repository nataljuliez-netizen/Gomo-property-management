import { Button, Modal } from "../common";

export default function DeleteUnitModal({
  open,
  unit,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Delete Unit"
    >
      <p className="text-slate-600">
        Are you sure you want to delete
        <strong>
          {" "}
          {unit?.unitNumber}
        </strong>
        ?
      </p>

      <p className="mt-2 text-sm text-red-600">
        This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}