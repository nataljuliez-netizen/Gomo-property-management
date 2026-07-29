import Modal from "../common/Modal";
import TransactionForm from "./TransactionForm";

export default function TransactionModal({
  open,
  onClose,
  onSave,
  transaction,
  tenants,
  properties,
  units,
}) {
  if (!open) return null;

  function handleSubmit(data) {
    onSave({
      ...transaction,
      ...data,
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        transaction
          ? "Edit Transaction"
          : "Record Rent Payment"
      }
    >
      <TransactionForm
        transaction={transaction}
        tenants={tenants}
        properties={properties}
        units={units}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}