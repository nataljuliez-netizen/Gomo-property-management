import { Modal } from "../common";

export default function DeleteLandlordModal({
  open,
  landlord,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      title="Delete Landlord"
      onClose={onCancel}
      onConfirm={onConfirm}
      confirmText="Delete"
      confirmVariant="danger"
      cancelText="Cancel"
    >
      <div className="space-y-3">
        <p className="text-slate-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">
            {landlord?.name}
          </span>
          ?
        </p>

        <p className="text-sm text-slate-500">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}